const express = require('express');
const app = express();


app.use(require('./project'));
app.use(require('./upload'));
app.use(require('./image'));


module.exports = app;