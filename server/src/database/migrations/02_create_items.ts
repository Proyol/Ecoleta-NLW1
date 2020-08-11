import Knex from 'knex';

//Fazer alterações no banco
export async function up(knex: Knex){
    return knex.schema.createTable('items', table =>{
        table.increments('id').primary(); //id
        table.string('image').notNullable();
        table.string('title').notNullable(); 
    });
}

//Deletar tabela
export async function down(knex: Knex){
    return knex.schema.dropTable('items');
}