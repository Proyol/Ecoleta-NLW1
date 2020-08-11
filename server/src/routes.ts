import express, { request, response } from 'express';

import PointsController from './controllers/points_controller';
import ItemsController from './controllers/items_cotroller';

/*
    Index: fazer uma listagem
    Show: mostrar apenas um registro
    Create: criar um registro
    Update: atualizar um registro
    Delete: deletar um registro
*/

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

//Rota para obter as informações das imagens
routes.get('/items', itemsController.index);

//Rota para inserir os pontos de coleta
routes.post('/points', pointsController.create);   

//
routes.get('/points', pointsController.index);

//Rota para pesquisar pontos 
routes.get('/points/:id', pointsController.show);


export default routes;