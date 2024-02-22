import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${
        DB_USER || 5000
      }:${DB_PASSWORD}@cluster0.nqhvecu.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
    );

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

start();
