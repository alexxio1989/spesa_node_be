


const { Prodotto } = require('../dto/prodotto');
const { getProdotto } = require('../mapper/dtoMapper');

function createProdotto(req, res , connection) {
    let prodotto = new Prodotto();
    prodotto = req.body;
    const sql = "INSERT INTO prodotto (nome_prodotto,desc_prodotto,prezzo_min,prezzo_max,type_prodotto_idtype_prodotto,market_idmarket,unita_misura_idunita_misura,utente_idutente) VALUES (?,?,?,?,?,?,?,?);";
    const params = [ prodotto.denom , prodotto.desc , prodotto.prezzo_min , prodotto.prezzo_max, prodotto.type.idtype_prodotto , prodotto.market.idmarket , prodotto.unitaMisura.idunita_misura , prodotto.utente_idutente ];
    const result = connection.query(sql, params, (err, result) => {
       
        
        getAllTypeProdotto(req, res , connection);
        
    })
   
}

function deleteProdotto(req, res , connection) {
    let prodotto = new Prodotto();
    prodotto = req.body;
    const sql = "";
    const params = [];
    const result = connection.query(sql, params, (err, result) => {
       
       
        getAllTypeProdotto(req, res , connection);
        
    })
   
}

function getAllProdotto(req, res , connection) {
    const sql = "";
    const result = connection.query(sql, (err, result) => {
       
        if (err) {
            res.send('Recupero in errore')
        }
        let outList = [];
        if(result && result.length > 0){
            result.forEach(element => {
                outList.push(getProdotto(element))
            });
        }
        res.send(outList)
        
        
    })
   
}

module.exports = { createProdotto , deleteProdotto , getAllProdotto}