
const jwt= require('jsonwebtoken');
const { Utente } = require('../dto/utente');
require('dotenv').config();

function createUtente(req, res , connection) {
    let utente = req.body;
    let sql = "INSERT INTO utente (nome,cognome,username,password) VALUES (?,?,?,?);";
    const params = [utente.nome , utente.cognome , utente.username , utente.password];
    const result = connection.query(sql, params, (err, result) => {
       
        if (err) {
            res.send('Salvataggio in errore')
        }
        res.send('Salvataggio avvenuto con successo')
        
    })
}



function getUtente(req, res, connection) {
    let utente = req.body;
    let sql = "SELECT * FROM utente WHERE username = ? AND password  = ?;";
    const params = [utente.username , utente.password];
    const result = connection.query(sql, params, (err, result) => {
       
        if (err) {
            res.send('Recupero in errore')
        }
        if(result && result.length > 0){
            let utenteRetrieved = result[0]
            let utente = utenteRetrieved;
            const ts = process.env.TOKEN_SECRET;
            console.log('TOKEN_SECRET : ' + ts)
            const accessToken = jwt.sign(JSON.stringify(utente) ,process.env.TOKEN_SECRET);
            console.log('ACCESS_SECRET : ' + accessToken)
            res.set("ACCESS_TOKEN" , accessToken)
            res.send(utente)
        }
        
        
    })
    
}


module.exports = { createUtente , getUtente }