import express from 'express';
import body_parser from 'body-parser';
import cors from 'cors';

import cajaRouter from './backend/src/api/routes/contratos.routes.js';
import categoriaRouter from './backend/src/api/routes/contratos.routes.js';
import clienteRouter from './backend/src/api/routes/contratos.routes.js';
import codbarraRouter from './backend/src/api/routes/contratos.routes.js';
import contratoRouter from './backend/src/api/routes/contratos.routes.js';
import empresaRouter from './backend/src/api/routes/contratos.routes.js';
import facproveedorRouter from './backend/src/api/routes/contratos.routes.js';
import metpagoRouter from './backend/src/api/routes/contratos.routes.js';
import notcontratoRouter from './backend/src/api/routes/contratos.routes.js';
import productoRouter from './backend/src/api/routes/contratos.routes.js';
import proveedorRouter from './backend/src/api/routes/contratos.routes.js';
import Router from './backend/src/api/routes/contratos.routes.js';
import usuarioRoute from './backend/src/api/routes/usuarios.routes.js';



const port = 3000;

const app = express();

app.use(cors());
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false}));

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

app.use('/usuario', usuarioRoute);
app.use('/contrato', contratoRouter);
// app.use('/empresa', );
app.use('/caja', cajaRouter );
// app.use('/matodoPago', );
// app.use('/categoria', );
app.use('/codigoBarra', codbarraRouter);
// app.use('/producto', );
// app.use('/facturaProveedor', );
// app.use('/cliente', );
// app.use('/proveedor', );
// app.use('/notiContrato', );
app.use('/cliente', clienteRouter );


app.listen(port,()=>{
  console.log(`Servidor DOCHER ejecutando en http://localhost:${port}`);
})