'use strict'

import * as express from 'express';
import router from './routes';

const app: express.Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);

export default app;
