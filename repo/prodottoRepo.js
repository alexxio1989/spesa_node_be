


const { Prodotto } = require('../dto/prodotto');
const { getProdotto } = require('../mapper/dtoMapper');

function createProdotto(req, res , connection) {
    let prodotto = new Prodotto();
    prodotto = req.body;
    const sql = "INSERT INTO prodotto (nome_prodotto,desc_prodotto,prezzo_min,prezzo_max,type_prodotto_idtype_prodotto,market_idmarket,unita_misura_idunita_misura,utente_idutente) VALUES (?,?,?,?,?,?,?,?);";
    const params = [ prodotto.denom , prodotto.desc , prodotto.prezzo_min , prodotto.prezzo_max, prodotto.type.idtype_prodotto , prodotto.market.idmarket , prodotto.unitaMisura.idunita_misura , prodotto.utente_idutente ];
    const result = connection.query(sql, params, (err, result) => {
       
        
        if (err) {
            res.send('Recupero in errore')
        }

        res.send('Salvataggio avvenuto con successo')
        
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
    const sql = "SELECT p.* , m.idmarket , m.desc_market , m.color_market , tp.idtype_prodotto , tp.desc_type_prodotto , tp.color_type_prodotto , um.idunita_misura , um.desc_unita_misura FROM prodotto p JOIN market m ON p.market_idmarket = m.idmarket JOIN type_prodotto tp ON tp.idtype_prodotto = p.type_prodotto_idtype_prodotto JOIN unita_misura um ON um.idunita_misura = p.unita_misura_idunita_misura";
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