# Tipos de rotas

**Get:** Buscar uma ou mais informações no back-end

**Post**: Criar uma informação no back-end

**Put:** Atualizar uma informação existente

**Delete:** Remover uma informação



# TIPOS DE PARÂMETROS

**Param:**  parâmetros que vem com  a própria rota `request.params`

**Query**: parâmetros de pesquisa, separados por "?"

**Body:** parâmetros para criação e atualização de informações, para funcionar junto com o express é preciso usar `app.use(express.json);`



# FAZER REQUISIÇÃO NO INSOMNIA

```typescript
const users = [
    'Daniel',
    'Jeferson',
    'Cinglair',
    'Luiz',
    'André'
]

//Requisitar a informação de todos os usuários
app.get('/users', (request, response) => {
    console.log('Listagem de usuários');

    return response.json(users);
});

//Pesquisar informação com resquest.query
app.get('/users', (request, response) => {
    const search = String(request.query.search);
    const filteredUsers = search ? users.filter(users => users.includes(search)) : users;

    return response.json(filteredUsers);
});

//Requisitar a informação de apenas um usuário
app.get('/users/:id', (request, response)=>{
    const id = Number(request.params.id); //Obter a o parâmetro 'id' do da URL
    const user = users[id];

    return response.json(user);
});

//Enviar uma informação
app.post('/users', (request, response) => {
    const data = request.body;
    
    const user = {
        nome: data.name,
        email: data.email
    }
    return response.json(user);
});
```



# ROTAS EM OUTROS ARQUIVOS

no arquivo *routes.ts:*

```typescript
import express from 'express';

const routes = express.Router();

routes.get('/', (request, response) => {
    return response.json({message: 'Hello World'});
});

export default routes;
```

no arquivo *server.ts:*

```typescript
import routes from './routes';
app.use(routes);
```

