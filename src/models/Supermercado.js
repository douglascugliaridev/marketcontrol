const { DataTypes } = require("sequelize");
const connection = require("../database/connection");

const Supermercado = connection.define('supermecados', {
    nome: {
        type: DataTypes.STRING
    }
});

module.exports = Supermercado