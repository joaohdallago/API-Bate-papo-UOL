import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

const participants = [];
const messages = [];

app.post('/participants', (req, res) => {
  participants.push(req.body);
  res.sendStatus(201);
});

app.get('/participants', (req, res) => {
  res.send(participants);
});

app.post('/messages', (req, res) => {
  messages.push(req.body);
  res.sendStatus(201);
});

app.get('/messages', (req, res) => {
  res.send(messages);
});

app.listen(5000);
