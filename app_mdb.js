const express = require("express");
const connectToMongoDB = require('./mdb_connect');

const app = express();
const PORT = 3001

app.get("/mdb", async (req, res) => {
    const db = await connectToMongoDB();
    const collection = db.collection('products');

    try {
        const result = await collection.findOne({ id: 1 });
        console.log('Retrieved data:', result);
    } catch (error) {
        console.error('Error retrieving data:', error);
    }
})
app.post("/mdb", async (req, res) => {
    const db = await connectToMongoDB();
    const collection = db.collection('products');
    const data = {
        id: 30,
        title: "Mens Casual Premium Slim Fit T-Shirts 2222",
        price: 22.3,
        description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        rating: {
            rate: 4.1,
            count: 259
        }
    }
    try {
        const result = await collection.insertOne(data);
        console.log('Inserted document:', result.insertedId);
    } catch (error) {
        console.error('Error inserting data:', error);
    }
})
app.patch("/mdb", async (req, res) => {
    const db = await connectToMongoDB();
    const collection = db.collection('products');

    try {
        const result = await collection.updateOne({id: 2}, { $set: {id: 22} });
        console.log('Matched:', result.matchedCount, 'Modified:', result.modifiedCount);
    } catch (error) {
        console.error('Error updating data:', error);
    }
})
app.delete("/mdb", async (req, res) => {
    const db = await connectToMongoDB();
    const collection = db.collection('products');

    try {
        const result = await collection.deleteOne({id: 30});
        console.log('Deleted document count:', result.deletedCount);
    } catch (error) {
        console.error('Error deleting data:', error);
    }
})


app.listen(PORT, () => console.log('API running on : ' + PORT))
