// /api/new-meetup
import { MongoClient } from "mongodb";

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        await MongoClient.connect('mongodb+srv://Mandapj:FGihrxQncVvwzfJ6@cluster0.pd7ri3k.mongodb.net/meetups');
        const db = client.db();

        const meetupsCollection = db.collection('meetups');
        const result = await meetupsCollection.insertOne(data);

        client.close();

        res.status(201).json({ message: 'Meetup inserted!' })
    }
}

export default handler;