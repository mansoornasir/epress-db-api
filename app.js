const express = require("express");
const mysql = require('mysql');

const app = express();
const PORT = 3001

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

});

app.listen(PORT, () => console.log('API running on : ' + PORT))
