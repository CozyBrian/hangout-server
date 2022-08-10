const client = require('../../services/postgres');

function getUserInfo(req, res) {
  console.log(req.body.user_id);
  client.query(`select * from users where user_id=${req.body.user_id}`, (err, result)=> {
    if (err) return res.sendStatus(401);

    res.send(result.rows);
  });

  client.end;
}

function getAllUsers(req, res) {
  client.query(`select * from users`, (err, result)=> {
    if (err) return res.sendStatus(401);

    res.send(result.rows);
  });

  client.end;

}
function postAUser(req, res) {

  const user = req.body;

  client.query(
    `INSERT INTO users (user_id, username, email, passkey) 
    VALUES (
      ${user.id},
      ${user.username},
      ${user.email},
      ${user.passkey}
    ) RETURNING *`, (err, result) => {
    if (err) return res.sendStatus(401);

    res.status(201).send(`User added with ID: ${result.rows[0].user_id}`);
  });

  client.end;
}

function updateUserName(req, res) {
  const id = parseInt(req.params.id);
  const user = req.body;

  client.query(
    `UPDATE users SET username=${user.username} WHERE user_id=${id}`, (err, result) => {
    if (err) return res.sendStatus(401);

    res.status(200).send(`User modified with ID: ${id}`);
  });

  client.end;
}

function deleteUser(req, res) {
  const id = parseInt(req.params.id);

  client.query(
    `DELETE from users WHERE user_id=${id}`, (err, result) => {
    if (err) return res.sendStatus(401);

    res.status(200).send(`User deleted with ID: ${id}`);
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