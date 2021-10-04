const express = require('express');
const jwt= require('jsonwebtoken');
const mysql = require('mysql'); 
const { createUtente, getUtente } = require('./repo/utenteRepo');
const app = express()
const port = 3000


app.use(express.json({limit: '150mb'}));
app.use(express.urlencoded( {limit: '150mb',extended : true} ))

app.listen(process.env.PORT || 8000, function () {});


const connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'Alessio1989',
  database : 'spesa',
  insecureAuth : true
});

connection.connect((err) =>{
  if(err){
      throw err;
  }
  console.log("Mysql Connected ...")
})

app.post('/signin', (req, res) => {
  createUtente(req, res, connection);
})

app.post('/login' ,(req, res) => {
  getUtente(req, res, connection);
})

app.post('/test', authenticateToken ,(req, res) => {
  res.send('ALL OK')
})

function authenticateToken(req, res, next) {
  const authHeader = req.headers['access_token']
  
  if (authHeader == null) return res.sendStatus(401)

  jwt.verify(authHeader, process.env.TOKEN_SECRET , (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    next()
  })
}

