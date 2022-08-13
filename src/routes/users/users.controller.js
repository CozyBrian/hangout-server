const client = require('../../services/postgres');

function getUserInfo(req, res) {
  console.log(req.params.id);
  client.query(`select * from users where user_id='${req.params.id}'`, (err, result)=> {
    if (err) {
      console.log(err);
      return res.status(401).send({
        error: 'SERVER_ERROR'
      });
    }

    return res.send(result.rows);
  });

  client.end;
}

function getAllUsers(req, res) {
  client.query(`select user_id, username from users`, (err, result)=> {
    if (err) {
      console.log(err);
      return res.status(401).send({
        error: 'SERVER_ERROR'
      });
    }

    return res.send(result.rows);
  });

  client.end;

}
function postAUser(req, res) {

  const user = req.body;

  client.query(
    `INSERT INTO users (user_id, username, email, passkey) 
    VALUES (
      '${user.id}',
      '${user.username}',
      '${user.email}',
      '${user.passkey}'
    )`, (err, result) => {

    if (err) {
      console.log(err);
      return res.sendStatus(401);
    } 

    return res.status(201).send(`User added with ID: ${req.body.id}`);
  });

  client.end;
}

function updateUserName(req, res) {
  const id = req.params.id;
  const user = req.body;

  client.query(
    `UPDATE users SET username='${user.username}' WHERE user_id='${id}'`, (err, result) => {
      if (err) {
        console.log(err);
        return res.sendStatus(401);
      }

      return res.status(200).send(`User modified with ID: ${id}`);
  });

  client.end;
}

function deleteUser(req, res) {
  const id = req.params.id;

  client.query(
    `DELETE from users WHERE user_id='${id}'`, (err, result) => {
      if (err) {
        console.log(err);
        return res.sendStatus(401);
      }

      return res.status(200).send(`User deleted with ID: ${id}`);
  });

  client.end;
}

module.exports = {
  getAllUsers,
  getUserInfo,
  postAUser,
  updateUserName,
  deleteUser
};