const express = require("express");
const bodyParser = require('body-parser');
const client = require('./connection')

const PORT = 3000;
const app = express();

//app.use(express.json());
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

app.get('/users', (req, res) => {
  client.query(`select * from employee`, (err, result)=> {
    if (err) return res.sendStatus(401);

    res.send(result.rows);
  });
  client.end;
});

app.get('/users/:dno', (req, res) => {
  client.query(`select fname,ssn,lname from employee where dno=${req.params.dno}`, (err, result)=> {
    if (err) return res.sendStatus(401);

    res.send(result.rows);
    console.log(result.rowCount);
  });

  client.end;
});


client.connect();