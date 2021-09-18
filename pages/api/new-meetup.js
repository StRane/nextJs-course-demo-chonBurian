import { MongoClient } from "mongodb";

// /api/new-meetup
// POST /api/new-data

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://Umut:uU.4567405142umut@cluster0.pibb1.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);
    
    console.log(result);

    client.close();

    res.status(201).json({message: 'Message inserted'});
  }
}

export default handler;
