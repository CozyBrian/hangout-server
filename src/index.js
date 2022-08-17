const express = require("express");
const bodyParser = require('body-parser');

const client = require('./services/postgres');

const api = require('./routes/api');
const logger = require("./middleware/logger");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(logger);
app.use('/v1', api);



app.get('/', (req, res) => {
  res.send("Hello worldddd");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

client.connect();