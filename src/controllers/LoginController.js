const Usuario = require('../models/Usuario')
const {compareSync} = require('bcryptjs')
const { sign } = require('jsonwebtoken')

class LoginController {
    async login(req, res) {
        try {
            const dados = req.body

            if (!dados.email || !dados.password) {
                return res.status(400).json({ mensagem: 'Email e senha obrigatórios' })
            }

            const usuario = await Usuario.findOne({ where: { email: dados.email } })
    
            if (!usuario) {
                return res.status(404).json({ mensagem: 'Conta não encontrada' })
            }

            if (!compareSync(dados.password, usuario.password_hash)) {
                return res.status(401).json({ mensagem: 'Email ou senha inválido' })
            }

            const token = sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1d' })

            return res.json({ 'Authorization': token, 'Nome': usuario.nome })

        } catch (error) {
            return res.status(500).json({ error: 'Erro ao efetuar o login' })
        }
    }
}   

module.exports = new LoginController()