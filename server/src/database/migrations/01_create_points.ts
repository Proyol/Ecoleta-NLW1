import Knex from 'knex';

//Fazer alterações no banco
export async function up(knex: Knex){
    return knex.schema.createTable('points', table =>{
        table.increments('id').primary(); //id
        table.string('image').notNullable();
        table.string('name').notNullable(); 
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    });
}

//Deletar tabela
export async function down(knex: Knex){
    return knex.schema.dropTable('point');
}