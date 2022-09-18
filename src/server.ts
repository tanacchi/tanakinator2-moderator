'use strict'

import config from './config/config';
import app from './app';

app.listen(config.app.port, () => {
    console.log(`Start on port ${config.app.port}`);
})
