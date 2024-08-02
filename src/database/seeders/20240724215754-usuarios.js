'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', [
      {
        nome: 'Joaquim',
        cpf: '11111111111',
        dataNascimento: new Date('2000-01-01'), 
        email: 'joaquim@example.com',
        password_hash: '$2a$10$MahaPiRuoWb1uYiBeh6zXOrDv8HnOgBOa9TR3gvJdEhHSPqQXvWWO',
        confirma_password_hash: '$2a$10$MahaPiRuoWb1uYiBeh6zXOrDv8HnOgBOa9TR3gvJdEhHSPqQXvWWO',
        cep: '12345678',
        logradouro: 'Rua das Flores',
        municipio: 'São Paulo',
        uf: 'SP',
        createdAt: new Date('2024-07-22 13:00:00'),
        updatedAt: new Date('2024-07-22 13:00:00')
      },
      {
        nome: 'Maria',
        cpf: '22222222222',
        dataNascimento: new Date('2000-01-01'), 
        email: 'maria@example.com',
        password_hash: '$2a$10$MahaPiRuoWb1uYiBeh6zXOrDv8HnOgBOa9TR3gvJdEhHSPqQXvWWO',
        confirma_password_hash: '$2a$10$MahaPiRuoWb1uYiBeh6zXOrDv8HnOgBOa9TR3gvJdEhHSPqQXvWWO',
        cep: '12345678',
        logradouro: 'Rua das Flores',
        municipio: 'São Paulo',
        uf: 'SP',
        createdAt: new Date('2024-07-22 13:00:00'),
        updatedAt: new Date('2024-07-22 13:00:00')
      },
      {
        nome: 'João',
        cpf: '11111111111',
        dataNascimento: new Date('2000-01-01'), 
        email: 'joao@example.com',
        password_hash: '$2a$10$MahaPiRuoWb1uYiBeh6zXOrDv8HnOgBOa9TR3gvJdEhHSPqQXvWWO',
        confirma_password_hash: '$2a$10$MahaPiRuoWb1uYiBeh6zXOrDv8HnOgBOa9TR3gvJdEhHSPqQXvWWO',
        cep: '12345678',
        logradouro: 'Rua das Flores',
        municipio: 'São Paulo',
        uf: 'SP',
        createdAt: new Date('2024-07-22 13:00:00'),
        updatedAt: new Date('2024-07-22 13:00:00')
      } 
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {})
  }
};
