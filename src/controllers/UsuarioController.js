const padraoEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
const padraoDataNascimento = /^\d{4}-\d{2}-\d{2}$/;
const Usuario = require('../models/Usuario')
const Local = require('../models/Local');
const Atividade = require('../models/Atividade');

class UsuarioController {

    async cadastrarUsuario(request, response) {
        try {
            const dados = request.body

            if (!(dados.nome)) {
                return response
                    .status(400)
                    .json({ mensagem: 'O nome é obrigatório' })
            }

            if(typeof dados.nome !== 'string') {
                return response
                    .status(400)
                    .json({ mensagem: 'O nome deve ser uma string' })
            }

            if(!(dados.cpf?.length === 11)) {
                return response
                    .status(400)
                    .json({ mensagem: 'O CPF deve ter 11 digitos' })
            }
            
            if(padraoDataNascimento.test(dados.dataNascimento) === false) { 
                return response
                    .status(400)
                    .json({ mensagem: 'A data de nascimento deve estar no formato YYYY-MM-DD' })
            }
            
            if(!(dados.dataNascimento)) {
                return response
                    .status(400)
                    .json({ mensagem: 'A data de nascimento é obrigatória' })
            }

            if(!(dados.email)) {
                return response
                    .status(400)
                    .json({ mensagem: 'O email é obrigatório' })
            }

            if (padraoEmail.test(dados.email) === false) {
                return response
                    .status(400)
                    .json({ mensagem: 'O email está no formato inválido' })
            }

            if(!(dados.password)) {
                return response
                    .status(400)
                    .json({ mensagem: 'A senha é obrigatória' })
            }

            if(!(dados.confirmaPassword)) {
                return response
                    .status(400)
                    .json({ mensagem: 'A confirmação da senha é obrigatória' })
            }

            if (!(dados.password?.length >= 8 && dados.password?.length <= 16)) {
                return response
                    .status(400)
                    .json({ mensagem: 'A senha deve ter entre 8 e 16 dígitos' })
            }

            if(!(dados.confirmaPassword === dados.password)) {
                return response
                    .status(400)
                    .json({ mensagem: 'As senhas precisam ser iguais' })
            }

            if(!(dados.cep?.length === 8)) {
                return response
                    .status(400)
                    .json({ mensagem: 'O CEP deve ter 8 digitos' })
            }

            if(!(dados.logradouro)) {
                return response
                    .status(400)
                    .json({ mensagem: 'O logradouro é obrigatório' })
            }

            if(!(dados.municipio)) {
                return response
                    .status(400)
                    .json({ mensagem: 'O municiódio é obrigatório' })
            }

            if(!(dados.uf)) {
                return response
                    .status(400)
                    .json({ mensagem: 'O UF é obrigatório' })
            }

            const emailExistente = await Usuario.findOne(
                {
                    where: {
                        email: dados.email
                    }
                })   

            if (emailExistente) {
                return response
                    .status(409)
                    .json({ mensagem: 'Email já cadastrado' })
            }

            const cpfExistente = await Usuario.findOne(
                {
                    where: {
                        cpf: dados.cpf
                    }
                })

            if (cpfExistente) {
                return response
                    .status(409)
                    .json({ mensagem: 'CPF já cadastrado' })
            }
            
            const usuario = await Usuario.create({
                nome: dados.nome,
                cpf: dados.cpf,
                dataNascimento: dados.dataNascimento,
                email: dados.email,
                password_hash: dados.password,
                confirma_password_hash: dados.confirmaPassword,
                cep: dados.cep,
                logradouro: dados.logradouro,
                municipio: dados.municipio,
                uf: dados.uf
            })

            response.status(201).json({ 
                mensagem: 'Conta criada com sucesso',
                nome: usuario.nome,
                email: usuario.email,
                createdAt: usuario.createdAt
            })

        } catch (error) {
            response
                .status(500)
                .json({
                    mensagem: 'Não possível criar a conta: ',
                    error
                })
        }
    }

    async listarUsuarios(request, response) {
        try {
            const usuarios = await Usuario.findAll({
                include: {
                    model: Local,
                    as: 'locais',
                    attributes: [ 'id','nome', 'descricao', 'cep', 'logradouro', 'municipio', 'uf' ],
                    include: {
                        model: Atividade,
                        through: { attributes: [] }
                    }
                }
            })

            if (!(usuarios)) {
                return response
                    .status(404)
                    .json({
                        message: 'Nenhum usuário encontrado'
                    })
            }
            
            return response
                .status(200)
                .json(usuarios)

        } catch (error) {
            response
                .status(500)
                .json({
                    mensagem: 'Erro ao buscar os usuários: ',
                    error
                })
        }
    }
}

module.exports = new UsuarioController()