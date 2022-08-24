const client = require('../../services/postgres');

function getUserInfo(req, res) {
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
  client.query(`select user_id, username, about, profile_image from users`, (err, result)=> {
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

function getRandomUsers(req, res) {
  client.query(`select user_id, username, about, profile_image from users`, (err, result)=> {
    if (err) {
      console.log(err);
      return res.status(401).send({
        error: 'SERVER_ERROR'
      });
    }
    const data = result.rows;
    
    let responseData = [];
    while (responseData.length != 5) {
      let x = Math.floor(Math.random() * data.length);
      if (!responseData.includes(data[x])) {
        responseData.push(data[x]);
      }
    }
    return res.send(responseData);
        
  });

  client.end;
}

function getFriends(req, res) {
  const data = req.body;

  client.query(`SELECT user_id, username, about, profile_image
	  FROM users WHERE user_id IN (
    SELECT DISTINCT CASE WHEN following_id='${data.user_id}' 
    THEN user_id
    ELSE following_id
    END user_id FROM friends WHERE
    '${data.user_id}' IN (user_id , following_id)
    )`, (err, result) => {

    if (err) {
      console.log(err);
      return res.status(401).send({
        error: 'SERVER_ERROR'
      });
    }

    return res.send(result.rows);
  });
}

function addFriend(req, res) {
  const data = req.body;
  const id = req.params.id

  client.query(`INSERT INTO friends(user_id, following_id)
    VALUES ('${data.user_id}', '${id}')`, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(401).send({
        error: 'SERVER_ERROR'
      });
    }

    return res.status(200).send({
      message: "SUCCESS"
    });
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

async function updateUserInfo(req, res) {
  const id = req.params.id;
  const user = req.body;
  let error;

  console.log(user);
  
  if(user.about && user.about != "") {
    await client.query(`UPDATE users SET about='${user.about}' WHERE user_id='${id}'`).catch((e) => {
      error = e;
      console.log(e);
    });
  }
  if(user.profileImage && user.profileImage != "") {
    await client.query(`UPDATE users SET profile_image='${user.profileImage}' WHERE user_id='${id}'`).catch((e) => {
      error = e;
      console.log(e);
    });
  }
  
  client.end;

  if(error == null) {
    return res.status(200).send(`User modified with ID: ${id}`);
  } else {
    console.log(error);
    return res.sendStatus(401);
  }
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
  getRandomUsers,
  getUserInfo,
  postAUser,
  updateUserInfo,
  deleteUser,
  getFriends,
  addFriend
};
