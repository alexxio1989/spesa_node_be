const { Market } = require('../dto/market');
const { Prodotto } = require('../dto/prodotto');
const { TypeProdotto } = require('../dto/typeProdotto');
const { UnitaMisura } = require('../dto/unitaMisura');

function getProdotto(obj) {
    let out = new Prodotto();
    if(out){
        
    }
    return out;
}

function getMarket(obj) {
    let out = new Market();
    if(out){
        out.idmarket = obj.idmarket;
        out.desc_market = obj.desc_market;
        out.color_market = obj.color_market;
        out.utente_idutente = obj.utente_idutente;
    }
    return out;
}

function getTypeProdotto(obj) {
    let out = new TypeProdotto();
    if(out){
        out.idtype_prodotto = obj.idtype_prodotto;
        out.desc_prodotto = obj.desc_prodotto;
        out.color_prodotto = obj.color_prodotto;
        out.utente_idutente = obj.utente_idutente;
    }
    return out;
}

function getUnitaMisura(obj) {
    let out = new UnitaMisura();
    if(out){
        out.idunita_misura = obj.idunita_misura;
        out.desc = obj.desc_unita_misura;
        out.utente_idutente = obj.utente_idutente;
    }
    return out;
}

module.exports = { getTypeProdotto, getUnitaMisura,getProdotto,getMarket}