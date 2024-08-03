const { DataTypes } = require("sequelize");
const connection = require("../database/connection");
const Supermercado = require("./Supermercado");

const Lista = connection.define('listas', {
    nome: {
        type: DataTypes.STRING
    },
    data_criacao: {
        type: DataTypes.DATE
    },
    supermercadoId: {
        type: DataTypes.INTEGER
    },
});

Lista.belongsTo(Supermercado, {
    foreignKey: 'supermercadoId',
    as: 'supermercado'
})

module.exports = Lista