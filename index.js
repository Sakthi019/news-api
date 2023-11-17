import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import news from './Src/Routes/routes.js';
dotenv.config();

const PORT = process.env.PORT || 9000;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/news', news);

app.listen(PORT, () => {
    console.log(`server is running in ${PORT}`);
})