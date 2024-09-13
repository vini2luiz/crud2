import { Router } from 'express';
import usuarioController from './controller/usuario.controller';

const routes = Router();

routes.post('/create-usuario', usuarioController.create);
routes.get('/usuario', usuarioController.findAll);
routes.put('/usuario/:id', usuarioController.update);
routes.delete('/usuario-delete/:id', usuarioController.delete);
routes.post('/login', usuarioController.login);

export {
    routes
}
