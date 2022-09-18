'use strict'

import * as express from 'express';
import config from './config/config';
import router from './routes';

const app: express.Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);

app.listen(config.app.port, () => {
    console.log(`Start on port ${config.app.port}`);
})

export default app;
