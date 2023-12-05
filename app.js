const express = require("express");
const mysql = require('mysql');
const Joi = require('joi');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const app = express();
const PORT = 3001

app.use(express.json());

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: "root",
    password: "mans00r",
    database: 'ecomerce2'
})

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }

    console.log("Connected to the database")

    app.get("/", (req, res) => {
        connection.query(`SELECT * FROM customers ORDER BY cid ${req.query.sort}`, (error, results, fields) => {
            if (error) throw error;
            res.send(results)
        });
    })
    app.post("/", (req, res) => {
        const sql = "INSERT INTO customers(cname, caddress, cemail) VALUES ('Test', 'Test Add', 'test@test.com')";
        const values = ["Test", "Test Address", "test@test.com"]
        connection.query(sql, values, (error, results, fields) => {
            res.send(results.insertId+"")
        })
    })
    app.patch("/", (req, res) => {

    })
    app.delete("/", (req, res) => {

    })

    app.post("/users", async (req, res) => {
        const schema = Joi.object({

            email: Joi.string()
                .email()
                .required(),

            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        
        })

        schema.validate({ email: req.body.email, password: req.body.password });
        
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password,salt)
        
        connection.query(`SELECT * from users where email='${req.body.email}'`, (err, results, fields) => {
            if(results.length > 0) {
                res.status(401).send("Email already registered.")
            }

            const sql = `INSERT INTO users(id, email, password) VALUES (NULL, '${req.body.email}', '${hash}')`;
    
            connection.query(sql, (err, results, fields) => {
                if(err) {
                    console.log(err) 
                    return;
                }
                else {
                    res.send("User Created")
                }
            });
        })




    })

    app.post("/login", (req, res) => {
        connection.query(`SELECT * FROM users WHERE email='${req.body.email}'`, async (err, results, fields) => {
            const compare = await bcrypt.compare(req.body.password, results[0].password)
            if(!compare) 
                res.status(500).send("Password is incorrect!");
            else
            {
                const token = jwt.sign(req.body.email, "123456")
                
                res.header("token", token).send()
            }
        })
    })

    app.get("/test", (req, res, next) => {
        const token = req.header("token");
        if(!token) 
        {
            res.status(501).send("Token not found");
        }
        else {
            try {
                const email = jwt.verify(token, "123456")
                if(!email) {
                    res.send("token not valid")
                }
                else {
                    next();
                }
            }
            catch(err) {
                res.send(err)
            }
        }
    }, (req, res) => {
        res.send("A protected route")
    })

});

app.listen(PORT, () => console.log('API running on : ' + PORT))
