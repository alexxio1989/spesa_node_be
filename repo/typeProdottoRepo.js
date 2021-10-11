const { TypeProdotto } = require('../dto/typeProdotto');
const { getTypeProdotto } = require('../mapper/dtoMapper');

function createTypeProdotto(req, res , connection) {
    let typeProd = new TypeProdotto();
    typeProd = req.body;
    const sql = "INSERT INTO type_prodotto (desc_type_prodotto,color_type_prodotto,utente_idutente) VALUES (?,?,?);";
    const params = [typeProd.desc_prodotto , typeProd.color_prodotto , typeProd.utente_idutente ];
    const result = connection.query(sql, params, (err, result) => {
       
        
        getAllTypeProdotto(req, res , connection);
        
    })
   
}

function deleteTypeProdotto(req, res , connection) {
    let typeProd = new TypeProdotto();
    typeProd = req.body;
    const sql = "DELETE FROM type_prodotto WHERE idtype_prodotto = ?;";
    const params = [typeProd.idtype_prodotto];
    const result = connection.query(sql, params, (err, result) => {
       
       
        getAllTypeProdotto(req, res , connection);
        
    })
   
}

function getAllTypeProdotto(req, res , connection) {
    const sql = "SELECT * FROM type_prodotto ";
    const result = connection.query(sql, (err, result) => {
       
        if (err) {
            res.send('Recupero in errore')
        }
        let outList = [];
        if(result && result.length > 0){
            result.forEach(element => {
                outList.push(getTypeProdotto(element))
            });
        }
        res.send(outList)
        
        
    })
   
}

module.exports = { createTypeProdotto , deleteTypeProdotto , getAllTypeProdotto}