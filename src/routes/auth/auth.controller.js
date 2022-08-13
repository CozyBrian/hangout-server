require('dotenv').config();
const client = require('../../services/postgres');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const nanoid = require('nanoid');

function _generateToken(data) {
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET,{ expiresIn: "24h" });
}

async function postSignUP(req, res) {
  const user = req.body;
  
  try {
    client.query(`SELECT email
    FROM users WHERE email='${user.email}'`, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send({
          error: 'SERVER_ERROR'
        });
      }

      if (result.rowCount > 0) {
        return res.status(400).send({
          error: "EMAIL_ALREADY_EXISTS"
        });
      }
    });

    const id = nanoid();
    const hashedPassword = await bcrypt.hash(user.password, 10);

    client.query(
      `INSERT INTO users (user_id, username, email, passkey) 
      VALUES (
        '${id}',
        '${user.username}',
        '${user.email}',
        '${hashedPassword}'
      )`, (err, result) => {
  
      if (err) {
        console.log(err);
        return res.status(400).send({
          error: 'BAD_REQUEST'
        });
      }

      const data = {
        user_id: id,
        username: user.username,
        email: user.email,
      }

      const accessToken = _generateToken(data);
      const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);

      client.query(`INSERT INTO "tokenStore"(refresh_token)
        VALUES ('${refreshToken}')`, (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).send({
              error: 'SERVER_ERROR'
            });
          }
      });

      var date = new Date(); // your date object
      date.setHours(date.getHours() + 24);

      const response = {
        accessToken: accessToken,
        localId: id,
        email: user.email,
        created: true,
        expiresIn: date.toISOString(),
        refreshToken: refreshToken
      }
  
      return res.status(201).send(response);
    });

    client.end;
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: 'SERVER_ERROR'
    });
  }

}

async function postSignIn(req, res) {
  const request = req.body;
  var userFromDB = {};

  client.query(`SELECT * FROM users WHERE email='${request.email}'`,async (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        error: 'SERVER_ERROR'
      });
    }
    if (result.rowCount == 0) {
      return res.status(404).send({
        error: "EMAIL_NOT_FOUND"
      });
    } 
    userFromDB = result.rows[0];

    const data = {
      user_id: userFromDB.user_id,
      username: userFromDB.username,
      email: userFromDB.email,
    }

    const accessToken = _generateToken(data);
    const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);

    var date = new Date(); // your date object
      date.setHours(date.getHours() + 24);

    const response = {
      accessToken: accessToken,
      localId: userFromDB.user_id,
      email: userFromDB.email,
      created: true,
      expiresIn: date.toISOString(),
      refreshToken: refreshToken
    }

    try {
      if (await bcrypt.compare(request.password, userFromDB.passkey)) {
        res.status(200).send(response);
      } else {
        res.status(401).send({
          error: "WRONG_PASSWORD"
        });
      }
    } catch (error) {
      return res.status(500).send({
        error: 'SERVER_ERROR'
      });
    }
  });
  client.end;
}

function refreshUsertoken(req, res) {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);

  client.query(`SELECT * FROM "tokenStore" WHERE refresh_token='${refreshToken}'`, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        error: 'SERVER_ERROR'
      });
    }
    if (result.rowCount == 0) {
      return res.status(403).send({
        error: "TOKEN_NOT_FOUND"
      });
    }
    
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,(err, user) => {
      if (err) {
        //console.log(err);
        return res.status(403).send({
          error: "TOKEN_EXPIRED"
        });
      }
      const accessToken = _generateToken({ username: user.username, email: user.email, user_id: user.user_id });
      res.send({ accessToken: accessToken });
    });
  });
};

module.exports = {
  postSignIn,
  postSignUP,
  refreshUsertoken
}