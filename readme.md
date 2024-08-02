# ExerciseOpenAir

## Sobre o ExerciseOpenAir-Backend

O _ExerciseOpenAir-Backend_ é uma api para cadastro de locais para exercícios ao ar livre. Ele permite que os usuários autorizados cadastrem locais.

## Problema Resolvido

Encontrar locais adequados para exercícios ao ar livre pode ser desafiador, especialmente em áreas urbanas. O ExerciseOpenAir resolve esse problema ao fornecer uma plataforma fácil de usar que lista locais para atividades físicas ao ar livre.

## Tecnologias Utilizadas

- _Back-end:_ NodeJS e Express
- _APIs:_ ViaCep e Awesomeapi para consultas de Cep e localização.
- _Banco de Dados:_ PostgreSQL
- _Swagger:_ para documentação da API

## Modelo de Dados

![Modelo de Dados](./src/assets/modelo-de-dados.png)

## Estrutura do Projeto

```
├── src 
    ├── assets
    ├── config
    │   └── docs
    ├── controllers
    │   └── AtividadeController.js
    │   └── UsuarioController.js
    │   └── LocalController.js
    │   └── LoginController.js  
    ├── database
    │   ├── migrations
    │   │   └── 20240711221146-create-table-usuarios.js
    │   │   └── 20240723234214-create-table-locais.js
    │   │   └── 20240724202635-create-table-atividades.js
    │   │   └── 20240724202647-create-table-local_atividades.js          
    │   └── seeds
    │       └── 20240724215754-usuarios.js
    │       └── 20240726205241-atividades.js    
    ├── middlewares
    ├── models
    │   └── Atividade.js
    │   └── Local.js
    │   └── Usuario.js
    │   └── LocalAtividade.js            
    ├── routes
    │   └── atividades.routes.js
    │   └── locals.routes.js    
    │   └── login.routes.js
    │   └── routes.js
    │   └── usuarios.routes.js            
    ├── services
├── index.js
├── server.js
├── .env_example
├── .gitignore
├── .sequelizerc
├── package-lock.json
├── package.json
├── README.md

```


## Como Executar

## Pré-requisitos

- NodeJS
- PostgreSQL

## Passos

1. Clone o repositório para sua máquina local.
2. Instale as dependências com: npm install.
3. Crie um banco de dados.
4. Ajuste as configurações do .env para o seu ambiente.
5. Execute as migrations com: npm run db:migrate.
6. Execute os seeds com: npm run db:seed.
7. Gerar a documentação da API com: npm run swagger.
8. Inicie o servidor com: npm run start:dev.
9. Acesse http://localhost:3000/docs/ para visualizar a documentação em seu navegador.

## Melhorias Futuras

- _Integração com Front-end:_ Fazer integração com o front-end.
- _Projeto:_ Melhorar a organização do projeto e separar bem as responsabilidades.
- _Testes:_ Incluir testes unitários e integrados.

## Contribuições

Contribuições são sempre bem-vindas! Por favor, leia o arquivo CONTRIBUTING.md para mais detalhes sobre como contribuir para o projeto.

## Licença

Distribuído sob a licença MIT. Veja LICENSE para mais informações.

## Contato

- Douglas Panizza Cugliari dos Santos - douglas.cugliari@gmail.com
