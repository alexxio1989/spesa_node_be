const express = require('express');
const jwt= require('jsonwebtoken');
const mysql = require('mysql'); 
const { createMarket, deleteMarket, getAllMarket } = require('./repo/marketRepo');
const { createProdotto, getAllProdotto } = require('./repo/prodottoRepo');
const { createTypeProdotto, deleteTypeProdotto, getAllTypeProdotto } = require('./repo/typeProdottoRepo');
const { createUnitaMisura, deleteUnitaMisura, getAllUnitaMisura } = require('./repo/unitaMisuraRepo');
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

app.post('/type/create' ,(req, res) => {
  createTypeProdotto(req, res, connection);
})

app.post('/type/delete' ,(req, res) => {
  deleteTypeProdotto(req, res, connection);
})

app.get('/type/getAll' ,(req, res) => {
  getAllTypeProdotto(req, res, connection);
})

app.post('/um/create' ,(req, res) => {
  createUnitaMisura(req, res, connection);
})

app.post('/um/delete' ,(req, res) => {
  deleteUnitaMisura(req, res, connection);
})

app.get('/um/getAll' ,(req, res) => {
  getAllUnitaMisura(req, res, connection);
})

app.post('/market/create' ,(req, res) => {
  createMarket(req, res, connection);
})

app.post('/market/delete' ,(req, res) => {
  deleteMarket(req, res, connection);
})

app.get('/market/getAll' ,(req, res) => {
  getAllMarket(req, res, connection);
})

app.post('/prodotto/create' ,(req, res) => {
  createProdotto(req, res, connection);
})

app.get('/prodotto/getAll' ,(req, res) => {
  getAllProdotto(req, res, connection);
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

