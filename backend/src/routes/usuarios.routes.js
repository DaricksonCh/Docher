import { Router } from "express";
import { registroUsuario } from "../controllers/usuarios.controller.js";


const usuarioRoute = Router();

usuarioRoute.post('/registrar', registroUsuario)



export default usuarioRoute;