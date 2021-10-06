

const { UnitaMisura } = require('../dto/unitaMisura');
const { getUnitaMisura } = require('../mapper/dtoMapper');

function createUnitaMisura(req, res , connection) {
    let unitaMisura = new UnitaMisura();
    unitaMisura = req.body;
    const sql = "INSERT INTO unita_misura (desc_unita_misura,utente_idutente) VALUES (?,?);";
    const params = [unitaMisura.desc , unitaMisura.utente_idutente];
    const result = connection.query(sql, params, (err, result) => {
       
        
        getAllUnitaMisura(req, res , connection);
        
    })
   
}

function deleteUnitaMisura(req, res , connection) {
    let unitaMisura = new UnitaMisura();
    unitaMisura = req.body;
    const sql = "DELETE FROM unita_misura WHERE idunita_misura = ?;";
    const params = [unitaMisura.idunita_misura];
    const result = connection.query(sql, params, (err, result) => {
       
       
        getAllUnitaMisura(req, res , connection);
        
    })
   
}

function getAllUnitaMisura(req, res , connection) {
    const sql = "SELECT * FROM unita_misura;";
    const result = connection.query(sql, (err, result) => {
       
        if (err) {
            res.send('Recupero in errore')
        }
        let outList = [];
        if(result && result.length > 0){
            result.forEach(element => {
                outList.push(getUnitaMisura(element))
            });
        }
        res.send(outList)
        
        
    })
   
}

module.exports = { createUnitaMisura , deleteUnitaMisura , getAllUnitaMisura}