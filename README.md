# HANGOUT SERVER

This is a backend for the hangout app, just incase I fell like I don't want to use firebase anymore.

<br>    

## Getting Started

Here are the routes

<br>    

## Routes

POST https://tesla-hangout-app.herokuapp.com/v1/auth/SignIn

```js
// Request

{
  email: 'email',
  password: 'password'
}

// Response

{
  accessToken: [ACCESS_TOKEN],
  localId: localId,
  email: "email",
  created: true,
  expiresIn: "expiresIn",
  refreshToken: [REFRESH_TOKEN]
}

```
POST  https://tesla-hangout-app.herokuapp.com/v1/auth/SignUp
```js
// Request

{
  username: 'username',
  email: 'email',
  password: 'password'
}

// Response

{
  accessToken: [ACCESS_TOKEN],
  localId: localId,
  email: "email",
  created: true,
  expiresIn: "expiresIn",
  refreshToken: [REFRESH_TOKEN]
}

```

GET  https://tesla-hangout-app.herokuapp.com/v1/messages/

POST  https://tesla-hangout-app.herokuapp.com/v1/messages/

GET  https://tesla-hangout-app.herokuapp.com/v1/users/

POST  https://tesla-hangout-app.herokuapp.com/v1/users/

GET  https://tesla-hangout-app.herokuapp.com/v1/users/:id

PUT  https://tesla-hangout-app.herokuapp.com/v1/users/:id

DELETE  https://tesla-hangout-app.herokuapp.com/v1/users/:id

