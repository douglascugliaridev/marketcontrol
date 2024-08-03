const {Router} = require('express')
const SupermercadoController = require('../controllers/SupermercadoController')

const supermercadoRoutes = new Router()

supermercadoRoutes.get('/', SupermercadoController.listarSupermercados)
supermercadoRoutes.post('/', SupermercadoController.cadastrarSupermercado)
supermercadoRoutes.delete('/:id', SupermercadoController.deletarSupermercado)
supermercadoRoutes.put('/:id', SupermercadoController.atualizarSupermercado)

module.exports = supermercadoRoutes