const express = require("express");
const bodyParser = require('body-parser');

const client = require('./services/postgres');

const api = require('./routes/api');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use('/v1', api);

app.listen(3000, () => {
  console.log(`listening on port ${PORT}`);
});

client.connect();