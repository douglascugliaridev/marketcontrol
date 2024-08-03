const {Router} = require('express')
const ListaController = require('../controllers/ListaController')

const listasRoutes = new Router()

listasRoutes.post('/', ListaController.cadastrarLista)
listasRoutes.get('/', ListaController.listarListas)
listasRoutes.delete('/:id', ListaController.deletarLista)
listasRoutes.put('/:id', ListaController.atualizarLista)

module.exports = listasRoutes