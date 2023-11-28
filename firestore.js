const express = require("express");
const { Firestore } = require('@google-cloud/firestore');
const firestore = new Firestore({ projectId: 'islamia-firebase'});

const app = express();
const PORT = 3001

app.post("/fire", async (req, res) => {
    const documentRef = firestore.collection("123").doc("rsRxGwfKcc1kWv0q1ZbK");
    const data = {
        id: 1,
        name: "Mansoor Nasir",
        email: "mansoor@gmail.com",
        password: "test@123"
    }
    try {
        await documentRef.set(data);
        console.log('Document created with ID:', documentId);
    } catch (error) {
        console.error('Error creating document:', error);
    }
})


app.listen(PORT, () => console.log('API running on : ' + PORT))
