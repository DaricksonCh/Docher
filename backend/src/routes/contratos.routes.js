import {Router} from 'express';
import {} from '../controllers/contratos.controller.js';

const contratoRouter = Router();

contratoRouter.get('/listar',listarContrato);

export default contratoRouter;