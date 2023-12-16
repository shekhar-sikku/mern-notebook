/* eslint-disable no-undef */
import express from 'express';
import connectMongo from './database.js';
import authRouter from './routes/auth.js';
import notesRouter from './routes/notes.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config({ path: './.env' });
const port = process.env.PORT;

connectMongo();

const app = express();

app.get('/', (req, res) => { res.send('Welcome to MERN Application - Mongo Express React & Node!') });

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/notes', notesRouter);

app.listen(port, () => {
    console.log(`\nServer listening at: http://localhost:${port}`)
});