'use strict'

import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';

import router from './routes';

const app = express();
app.use(logger('debug'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', router);

export default app;
