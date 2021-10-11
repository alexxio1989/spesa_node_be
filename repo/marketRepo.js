

const { Market } = require('../dto/market');
const {  getMarket } = require('../mapper/dtoMapper');

function createMarket(req, res , connection) {
    let market = new Market();
    market = req.body;
    const sql = "INSERT INTO market (desc_market,color_market,utente_idutente) VALUES (?,?,?);";
    const params = [market.desc_market,market.color_market,market.utente_idutente];
    const result = connection.query(sql, params, (err, result) => {
       
        
        getAllMarket(req, res , connection);
        
    })
   
}

function deleteMarket(req, res , connection) {
    let market = new Market();
    market = req.body;
    const sql = "DELETE FROM market WHERE idmarket = ?;";
    const params = [market.idmarket];
    const result = connection.query(sql, params, (err, result) => {
       
       
        getAllMarket(req, res , connection);
        
    })
   
}

function getAllMarket(req, res , connection) {
    const sql = "SELECT * FROM market;";
    const result = connection.query(sql, (err, result) => {
       
        if (err) {
            res.send('Recupero in errore')
        }
        let outList = [];
        if(result && result.length > 0){
            result.forEach(element => {
                outList.push(getMarket(element))
            });
        }
        res.send(outList)
        
        
    })
   
}


module.exports = { createMarket , deleteMarket , getAllMarket}