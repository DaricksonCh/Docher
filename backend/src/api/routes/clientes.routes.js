import { Router } from "express";
import { guardarCliente, listarClientes, buscarCliente, actualizarCliente } from '../controllers/cliente.controllers.js';
import { validatorCliente } from "../validation/cliente.validation.js";

const router = Router();

router.post("/registrar", validarToken, validatorCliente, guardarCliente);
router.get("/listar", validarToken, listarClientes);
router.get("/buscar/:id", validarToken, buscarCliente);
router.put("/editar/:id", validarToken, validatorCliente, actualizarCliente);


export default router;
