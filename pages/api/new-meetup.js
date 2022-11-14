import { MongoClient } from "mongodb";

// /api/new-meetup
// POST /api/new-data

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.NEXT_PUBLIC_MDB_KEY}`
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
