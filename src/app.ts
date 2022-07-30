'use strict'

import * as express from 'express';
import * as dotenv from "dotenv";
dotenv.config();

import router from './routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);

app.listen(process.env.APP_PORT, () => {
    console.log(`Start on port ${3000}`);
})

export default app;
