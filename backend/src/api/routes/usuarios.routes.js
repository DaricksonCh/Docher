import { Router } from "express";
import { guardarUsuario, listarUsuarios, buscarUsuario, actualizarUsuario, deshabilitarUsuario, habilitarUsuario } from '../controllers/usuarios.controller';


const usuarioRouter = Router();

usuarioRouter.post("/registrar", validatorUsuario, guardarUsuario);
usuarioRouter.get("/listar", listarUsuarios);
usuarioRouter.get("/buscar/:id", buscarUsuario);
usuarioRouter.put("/editar/:id", validatorUsuario, actualizarUsuario);
usuarioRouter.patch("/deshabilitar/:id", deshabilitarUsuario);
usuarioRouter.patch("/habilitar/:id", habilitarUsuario);

export default usuarioRouter;
