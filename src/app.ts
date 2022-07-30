'use strict'

import * as express from 'express';
import * as dotenv from "dotenv";
import config from './config/config';
import router from './routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);

app.listen(config.app.port, () => {
    console.log(`Start on port ${config.app.port}`);
})

export default app;
