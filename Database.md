# CONECTAR COM O BANCO DE DADOS

```
npm install knex
npm install sqlite3
```

```typescript
import knex from 'knex';
import path from 'path'; //biblioteca do express para trabalhar com os caminhos dos arquivos

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename:  path.resolve(__dirname, 'database.sqlite')
    },
});

export default connection;
```



# SISTEMA DE MIGRATIONS

Sistema responsável pelo histórico do banco de dados. Muito útil para trabalhar em grupos onde duas pessoas pessuem duas tabelas diferentes e querem obter as mesmas informações



**OBS:**  A ordem dos arquivos na pasta onde vão estar essas migrações é importante, pois a aplicação irá executar na ordem que elas aparecem no diretório

*EX:*

```
src >
	database >
		migrations >
			01_table_1.ts
			02_table_2.ts
			03_table_1&2.ts
```



# CRIANDO O BANCO DE DADOS

```typescript
import Knex from 'knex';

//Fazer alterações no banco
export async function up(knex: Knex){
    knex.schema.createTable('points', table =>{
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
```

Para banco de dados pivô:

```typescript
import Knex from 'knex';

//Criando o banco de dados pivô
export async function up(knex: Knex){
    return knex.schema.createTable('point_items', table =>{
        table.increments('id').primary(); //id
		
        //Referenciar a tabela original para fazer a conexão entre as duas tabelas
        table.integer('point_id')
            .notNullable()
            .references('id')
            .inTable('points');

        table.integer('item_id')
            .notNullable()
            .references('id')
            .inTable('items');; 
    });
}

//Deletar tabela
export async function down(knex: Knex){
    return knex.schema.dropTable('point_items');
}
```



# EXECUTANDO OS ARQUIVOS DO DATABASE

Em um arquivo .ts dentro do diretório raiz do projeto:

```typescript
import path from 'path';

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite'),
    },
    migrations:{
        directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
    },
    seeds:{
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    useNullAsDefault: true,
}
```

Para rodar a migration:

`npx knex migrate:latest --knexfile 'nomedoarquivo'.ts`



# INSERINDO ITEMS PADRÃO NA DATABASE

```typescript
import Knex from 'knex';

export async function seed(knex: Knex){
    await knex('nome_tabela').insert([
        { title: 'item1'},
        { title: 'item2'},
        { title: 'item3'}
    ]);
}
```

Para executar no terminal:

`npx knex seed:run --knexfile knexfile.ts`



# INSERINDO ITEMS POR REQUEST

```typescript
routes.post('/points', async(request, response) =>{
    const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items
    } = request.body;

    //Executar a inserção na tabela pivô apenas se a inserção na tabela "points" for bem sucedida
    const trx = await knex.transaction();

    //inserir na  tabela de pontos
    const inserted_ids = await trx('points').insert({
        image: 'image-fake',
        name: name,
        email: email,
        whatsapp: whatsapp,
        latitude: latitude,
        longitude: longitude,
        city: city,
        uf: uf
    });

    const point_id = inserted_ids[0];

    const pointItems = items.map((item_id: number) => {
        return {
            item_id,
            point_id: point_id
        }
    })

    await trx('point_items').insert(pointItems);

    return response.json({success: true});
});
```

