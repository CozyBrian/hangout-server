const client = require('../../services/postgres');

function postMessage(req, res) {
  const message = req.body;
  // TODO - uuid for msg_id

  client.query(`INSERT INTO messages(
	msg_id, incoming_id, outgoing_id, msg, "timestamp")
	VALUES (
    '${message.msg_id}', 
    '${message.incoming_id}', 
    '${message.outgoing_id}', 
    '${message.msg}', 
    current_timestamp)`, (err, result) => {

    if (err) {
      console.log(err);
      return res.sendStatus(401);
    }

    res.status(200).send(message);
  });

  client.end;
}

function getMessages(req, res) {
  const request = req.body;

  client.query(`SELECT * from messages WHERE 
    outgoing_id='${request.outgoing_id}' and incoming_id='${request.incoming_id}'`, 
    (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(401);
    }

    res.status(200).send(result.rows);
  });
}


module.exports = {
  postMessage,
  getMessages
}