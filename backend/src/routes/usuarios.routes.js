import { Router } from "express";
import { registroUsuario } from "../controllers/usuarios.controller";


const usuarioRoute = Router();

usuarioRoute.post('/registrar', registroUsuario)



export default usuarioRoute;