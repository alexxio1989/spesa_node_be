const { Market } = require('../dto/market');
const { Prodotto } = require('../dto/prodotto');
const { TypeProdotto } = require('../dto/typeProdotto');
const { UnitaMisura } = require('../dto/unitaMisura');

function getProdotto(obj) {
    let out = new Prodotto();
    if(out){
        out.idprodotto = obj.idprodotto;
        out.denom = obj.nome_prodotto;
        out.desc = obj.desc_prodotto;
        out.prezzo_min = obj.prezzo_min;
        out.prezzo_max = obj.prezzo_max;
        out.type = getTypeProdotto(obj);
        out.market = getMarket(obj);
        out.unitaMisura = getUnitaMisura(obj);
        out.utente_idutente = obj.utente_idutente;
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
        out.desc_prodotto = obj.desc_type_prodotto;
        out.color_prodotto = obj.color_type_prodotto;
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