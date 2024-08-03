const {Router} = require('express')
const ProdutoController = require('../controllers/ProdutoController')

const produtosRoutes = new Router()

produtosRoutes.post('/', ProdutoController.cadastrarProduto)
produtosRoutes.get('/', ProdutoController.listarProdutos)
produtosRoutes.delete('/:id', ProdutoController.deletarProdutos)
produtosRoutes.put('/:id', ProdutoController.atualizarProdutos)


module.exports = produtosRoutes