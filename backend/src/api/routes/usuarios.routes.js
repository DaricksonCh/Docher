import { Router } from "express";

import { guardarUsuario, listarUsuarios, buscarUsuario, actualizarUsuario, deshabilitarUsuario, habilitarUsuario } from '../api/controllers/usuario.controllers.js';


const router = Router();

router.post("/registrar", validarToken, validatorUsuario, guardarUsuario);
router.get("/listar", validarToken, listarUsuarios);
router.get("/buscar/:id", validarToken, buscarUsuario);
router.put("/editar/:id", validarToken, validatorUsuario, actualizarUsuario);
router.patch("/deshabilitar/:id", validarToken, deshabilitarUsuario);
router.patch("/habilitar/:id", validarToken, habilitarUsuario);

export default router;
