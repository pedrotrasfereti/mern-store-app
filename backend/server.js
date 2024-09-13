import express from 'express';
import { connectDB } from './config/db';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(5000, () => {
    connectDB();
    console.log('Server started at http://localhost:5000');
});
