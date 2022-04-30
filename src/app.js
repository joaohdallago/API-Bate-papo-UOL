import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import dayjs from 'dayjs';

import participantSchema from './schemas/participantSchema.js';
import messageSchema from './schemas/messageSchema.js';

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
  const validation = participantSchema.validate(req.body);
  if (validation.error) {
    return res.sendStatus(422);
  }

  const { name } = req.body;

  try {
    const participant = await db.collection('participants').findOne({ name });
    if (participant) {
      return res.sendStatus(409);
    }

    const newParticipant = {
      name,
      lastStatus: Date.now(),
    };

    const newMessage = {
      from: name,
      to: 'Todos',
      text: 'entra na sala...',
      type: 'status',
      time: dayjs().format('HH:mm:ss'),
    };

    await db.collection('participants').insertOne(newParticipant);
    await db.collection('messages').insertOne(newMessage);

    return res.sendStatus(201);
  } catch (err) {
    return res.send(err);
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

app.post('/messages', async (req, res) => {
  const { user } = req.headers;

  try {
    const participant = await db.collection('participants').findOne({ name: user });
    const validation = messageSchema.validate(req.body);

    if (!participant || validation.error) {
      return res.sendStatus(422);
    }

    const newMessage = {
      from: user,
      ...req.body,
      time: dayjs().format('HH:mm:ss'),
    };

    await db.collection('messages').insertOne(newMessage);

    return res.sendStatus(201);
  } catch (err) {
    return res.send(err);
  }
});

app.get('/messages', async (req, res) => {
  try {
    const messages = await db.collection('messages').find().toArray();

    res.send(messages);
  } catch (err) {
    res.send(err);
  }
});

app.listen(5000);
