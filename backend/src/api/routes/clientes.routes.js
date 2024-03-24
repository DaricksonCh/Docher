import { Router } from "express";
import { validarToken } from "../controllers/autentificacion.controller.js";
import { guardarCliente, listarClientes, buscarCliente, actualizarCliente, deshabilitarCliente, habilitarCliente } from '../controllers/cliente.controllers.js';
import { validatorCliente } from "../validation/cliente.validation.js";

const router = Router();

router.post("/registrar", validarToken, validatorCliente, guardarCliente);
router.get("/listar", validarToken, listarClientes);
router.get("/buscar/:id", validarToken, buscarCliente);
router.put("/editar/:id", validarToken, validatorCliente, actualizarCliente);
router.patch("/deshabilitar/:id", validarToken, deshabilitarCliente);
router.patch("/habilitar/:id", validarToken, habilitarCliente);

export default router;
