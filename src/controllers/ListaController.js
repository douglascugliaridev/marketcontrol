const Lista = require('../models/Lista')
const Supermercado = require('../models/Supermercado')

class ListaController {
    async cadastrarLista(req, res) {
        try {
            const { nome, data_criacao, supermercadoId } = req.body

            if (!nome || !data_criacao || !supermercadoId) {
                return res.status(400).json({ mensagem: 'Nome, data_criacao e supermercadoId obrigatórios' })
            }

            const lista = await Lista.create({ nome, data_criacao, supermercadoId })

            return res.status(201).json({ mensagem: 'Lista criada com sucesso', lista })

        } catch (error) {
            return res.status(500).json({ mensagem: 'Erro ao cadastrar lista', error })
        }
    }

    async listarListas(req, res) {
        try {
            const listas = await Lista.findAll({
                include: [{
                    model: Supermercado,
                    as: 'supermercado'
                }]
            })
            return res.status(200).json({ listas })
        } catch (error) {
            return res.status(500).json({ mensagem: 'Erro ao consultar listas', error })
        }
    }

    async deletarLista(req, res) {
        try {
            const { id } = req.params   

            if (!id) {
                return res.status(400).json({ mensagem: 'ID obrigatório' })
            }

            const lista = await Lista.findByPk(id)

            if (!lista) {
                return res.status(404).json({ mensagem: 'Lista não encontrada' })
            }

            await Lista.destroy({ where: { id } })

            return res.status(204).json()

        } catch (error) {
            return res.status(500).json({ mensagem: 'Erro ao excluir lista' })
        }
    }   

    async atualizarLista(req, res) {
        try {
            const { id } = req.params
            const { nome, data_criacao, supermercadoId } = req.body

            if (!id) {
                return res.status(400).json({ mensagem: 'ID obrigatório' })
            }

            const listaatualizar = await Lista.findByPk(id)

            if (!listaatualizar) {
                return res.status(404).json({ mensagem: 'Lista não encontrada' })
            }

            const listas = await Lista.update({ nome, data_criacao, supermercadoId }, { where: { id } })

            if (!listas) {
                return res.status(404).json({ mensagem: 'Lista não encontrada' })
            }

            return res.status(200).json({ mensagem: 'Lista atualizada com sucesso' })

        } catch (error) {
            return res.status(500).json({ mensagem: 'Erro ao atualizar lista' })
        }
    }
}

module.exports = new ListaController()