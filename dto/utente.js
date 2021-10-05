
class Utente{
    nome = ''
    cognome = ''
    username = ''
    password = ''
    constructor(nome, cognome ,username , password) {
        this.nome = nome;
        this.cognome = cognome;
        this.username = username;
        this.password = password
    }
}

module.exports = { Utente }