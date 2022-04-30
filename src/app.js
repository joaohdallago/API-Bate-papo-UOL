import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
mongoClient.connect().then(() => {
  db = mongoClient.db('chat-uol');
});

app.post('/participants', async (req, res) => {
  const newParticipant = req.body;

  try {
    await db.collection('participants').insertOne(newParticipant);

    res.sendStatus(201);
  } catch (err) {
    res.send(err);
  }
});

app.get('/participants', async (req, res) => {
  try {
    const participants = await db.collection('participants').find().toArray();

    res.send(participants);
  } catch (err) {
    res.send(err);
  }
});

app.post('/messages', (req, res) => {
  res.sendStatus(201);
});

app.get('/messages', (req, res) => {
  res.send(2);
});

app.listen(5000);
