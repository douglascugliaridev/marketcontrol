const Supermercado = require('../models/Supermercado')
const produto = require('../models/Produto')
const lista = require('../models/Lista')

class SupermercadoController {
    async cadastrarSupermercado(req, res) {
        try {
            const {nome} = req.body

            if (!nome) {
                return res.status(400).json({ mensagem: 'Nome obrigatório' })
            }
    
            if(typeof nome !== 'string') {
                return res.status(400).json({ mensagem: 'Nome deve ser uma string' })
            }
    
            const supermercado = await Supermercado.create({nome})

            res.status(201).json({mensagem: 'Supermercado criado com sucesso', supermercado})

        } catch (error) {
            return res.status(500).json({ mensagem: 'Erro ao cadastrar supermercado' })
        }
    }

    async listarSupermercados(req, res) {
        try {
            const supermercados = await Supermercado.findAll()
    
            if (!(supermercados)) {
                return res.status(404).json({ mensagem: 'Nenhum supermercado encontrado' })
            }
    
            return res.status(200).json(supermercados)

        } catch (error) {
            return res.status(500).json({ mensagem: 'Erro ao consultar supermercados' })
        }
    }

    async deletarSupermercado(req, res) {
        try {
            const {id} = req.params

            if (!id) {
                return res.status(400).json({ mensagem: 'ID obrigatório' })
            }   

            const produtos = await produto.findAll({ where: { supermercadoId: id } })
            const listas = await lista.findAll({ where: { supermercadoId: id } })

            if (produtos.length > 0 || listas.length > 0) {
                return res.status(400).json({ mensagem: 'Supermercado contém produtos ou listas vinculados' })
            }

            const supermercadoDeletar = await Supermercado.findByPk(id)

            if (!supermercadoDeletar) {
                return res.status(404).json({ mensagem: 'Supermercado não encontrado' })
            }

            await Supermercado.destroy({ where: { id } })
            
            return res.status(204).json()

        } catch (error) {
            return res.status(500).json({ mensagem: 'Erro ao excluir supermercado' })
        }
    }
    
    async atualizarSupermercado(req, res) {
        try {
            const {id} = req.params
            const {nome} = req.body
    
            if (!id) {
                return res.status(400).json({ mensagem: 'ID obrigatório' })
            }
    
            if (!nome) {
                return res.status(400).json({ mensagem: 'Nome obrigatório' })
            }
    
            const supermercado = await Supermercado.update({nome}, {where: {id}})

            if (!supermercado) {
                return res.status(404).json({ mensagem: 'Supermercado não encontrado' })
            }

            return res.status(200).json({ mensagem: 'Supermercado atualizado com sucesso' })    

        } catch (error) {
            return res.status(500).json({ mensagem: 'Erro ao atualizar supermercado' })
        }
    }
}

module.exports = new SupermercadoController()