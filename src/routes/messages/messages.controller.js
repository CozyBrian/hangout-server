const client = require('../../services/postgres');
const nanoid = require('nanoid');

function postMessage(req, res) {
  const message = req.body;
  // TODO - uuid for msg_id
  const id = nanoid(10);

  client.query(`INSERT INTO messages(
	msg_id, incoming_id, outgoing_id, msg, "timestamp")
	VALUES (
    '${id}', 
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

  client.query(`
    SELECT * FROM messages WHERE (outgoing_id='${request.outgoing_id}' and incoming_id='${request.incoming_id}') 
    or (outgoing_id='${request.incoming_id}' and incoming_id='${request.outgoing_id}') ORDER BY timestamp`, 
    (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(401);
    }

    res.status(200).send(result.rows);
  });
}
function getMessagesList(req, res) {
  const request = req.params;

  client.query(`
    SELECT  DISTINCT 
    CASE WHEN outgoing_id = '${request.id}' 
        THEN incoming_id 
        ELSE outgoing_id 
    END user_id
    FROM    messages
    WHERE   '${request.id}' IN (outgoing_id, incoming_id)`, 
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
  getMessages,
  getMessagesList
}