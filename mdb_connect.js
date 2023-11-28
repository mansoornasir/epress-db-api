const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://mansoor:mans00r@cluster0.bpksr.mongodb.net/?retryWrites=true&w=majority';

async function connectToMongoDB() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db('test');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

module.exports = connectToMongoDB;