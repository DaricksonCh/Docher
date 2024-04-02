import { Router } from "express";
import { actualizarCliente, buscarCliente, guardarCliente, listarClientes } from "../controllers/cliente.controller.js";


const clienteRouter = Router();

clienteRouter.post("/registrar", guardarCliente);
clienteRouter.get("/listar", listarClientes);
clienteRouter.get("/buscar/:id", buscarCliente);
clienteRouter.put("/editar/:id", actualizarCliente);

export default clienteRouter;
