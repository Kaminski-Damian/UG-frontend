const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes/index');

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/', routes);

app.listen(port);