const Produto = require('../models/Produto')
const { Op } = require("sequelize");

class ProdutoController {

    async cadastrarProduto(req, res) {
        try {
            const {nome, marca, preco, supermercadoId} = req.body   

            if (!nome || !marca || !preco || !supermercadoId) {
                return res.status(400).json({ mensagem: 'Nome, marca, preco e supermercadoId obrigatórios' })
            }

            const produtosCadastrado = await Produto.findAll({where: { nome: { [Op.iLike]: nome }}})
            
            produtosCadastrado.forEach(produto => {
                if (nome.toLowerCase() === produto.nome.toLowerCase() && marca.toLowerCase() === produto.marca.toLowerCase()) {
                    return res.status(400).json({ mensagem: 'Nome ja existe' })
                }
            });


            const produto = await Produto.create({nome, marca, preco, supermercadoId})

            res.status(201).json({mensagem: 'Produto criado com sucesso', produto})

        } catch (error) {
           if (error) {
                return res.status(500).json({ mensagem: 'Erro ao cadastrar supermercado', error })
            }
        }
    }

    async listarProdutos(req, res) {
        try {
            const produtos = await Produto.findAll()

            if (!(produtos)) {
                return res.status(404).json({ mensagem: 'Nenhum supermercado encontrado' })
            }

            return res.status(200).json(produtos)

        } catch (error) {
            if (!produtos) {
                return res.status(500).json({ mensagem: 'Erro ao consultar supermercados' })
            }
        }
    }

    async deletarProdutos(req, res) {
        try {
            const {id} = req.params 

            if (!id) {
                return res.status(400).json({ mensagem: 'ID obrigatório' })
            }

            const produtosDeletar = await Produto.findByPk(id)

            if (!produtosDeletar) {
                return res.status(404).json({ mensagem: 'Produtos não encontrado' })
            }

            // TODO: Verificar se o supermercado não esta vinculado a uma lista

            const produtos = await Produto.destroy({ where: { id } })
            
            if (!produtos) {
                return res.status(404).json({ mensagem: 'Produtos não encontrado' })
            }   

            return res.status(204).json()   

        } catch (error) {
            if (!produtos) {
                return res.status(500).json({ mensagem: 'Erro ao excluir supermercado' })
            }
        }
    }

    async atualizarProdutos(req, res) {
        try {
            const {id} = req.params
            const {nome, marca, preco, supermercadoId} = req.body   

            if (!id) {
                return res.status(400).json({ mensagem: 'ID obrigatório' })
            }   
            
            const produtosatualizar = await Produto.findByPk(id)

            if (!produtosatualizar) {
                return res.status(404).json({ mensagem: 'Produtos não encontrado' })
            }

            const produtos = await Produto.update({nome, marca, preco, supermercadoId}, {where: {id}})     

            if (!produtos) {
                return res.status(404).json({ mensagem: 'Produtos não encontrado' })
            }

            return res.status(200).json({ mensagem: 'Produtos atualizado com sucesso' })        

        } catch (error) {
            if (!produtos) {
                return res.status(500).json({ mensagem: 'Erro ao atualizar supermercado' })
            }
        }
    }   
}


module.exports = new ProdutoController()