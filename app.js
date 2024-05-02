import express from 'express';
import body_parser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

import cajaRouter from './backend/src/api/routes/contratos.routes.js';
import categoriaRouter from './backend/src/api/routes/contratos.routes.js';
import clienteRouter from './backend/src/api/routes/contratos.routes.js';
import codbarraRouter from './backend/src/api/routes/contratos.routes.js';
import contratoRouter from './backend/src/api/routes/contratos.routes.js';
import empresaRouter from './backend/src/api/routes/contratos.routes.js';
import facproveedorRouter from './backend/src/api/routes/contratos.routes.js';
import facturaRouter from './backend/src/api/routes/facturas.routes.js';
import metpagoRouter from './backend/src/api/routes/contratos.routes.js';
import notcontratoRouter from './backend/src/api/routes/contratos.routes.js';
import productoRouter from './backend/src/api/routes/contratos.routes.js';
import proveedorRouter from './backend/src/api/routes/proveedores.routes.js';
import usuarioRouter from './backend/src/api/routes/usuarios.routes.js';
import authTokenRouter from './backend/src/api/routes/auth.login.routes.js';



const port = 3000;

const app = express();

app.use(cors());
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false}));
app.use(helmet());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCh, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, token");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Max-Age", 3600);

  next();
});

app.use(express.json());

app.use('/caja', cajaRouter );
app.use('/categoria', categoriaRouter );
app.use('/cliente', clienteRouter );
app.use('/codigoBarra', codbarraRouter);
app.use('/contrato', contratoRouter);
app.use('/empresa', empresaRouter);
app.use('/facProveedor',facproveedorRouter);
app.use('/facturas',facturaRouter);
app.use('/metPago', metpagoRouter);
app.use('/notContrato', notcontratoRouter);
app.use('/producto', productoRouter);
app.use('/proveedor', proveedorRouter);
app.use('/usuario', usuarioRouter);
app.use('/auth-session',authSessionRouter)


app.listen(port,()=>{
  console.log(`Servidor DOCHER ejecutando en http://localhost:${port}`);
})