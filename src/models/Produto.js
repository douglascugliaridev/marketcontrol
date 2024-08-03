const { DataTypes } = require("sequelize");
const connection = require("../database/connection");
const Supermercado = require("./Supermercado");

const Produto = connection.define('produtos', {
    nome: {
        type: DataTypes.STRING
    },
    marca: {
        type: DataTypes.STRING
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2)
    },
    supermercadoId: {
        type: DataTypes.INTEGER
    },
});

Produto.belongsTo(Supermercado, {
    foreignKey: 'supermercadoId',
    as: 'supermercado'
})

module.exports = Produto