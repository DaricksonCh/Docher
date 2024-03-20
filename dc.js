import express from 'express';
import body_parser from 'body-parser';
import cors from 'cors';
import usuarioRoute from './backend/src/routes/usuarios.routes.js';
import contratoRouter from './backend/src/routes/contratos.routes.js';

const port = 3000;

const dc = express();

dc.use(cors());
dc.use(body_parser.json());
dc.use(body_parser.urlencoded({extended:false}));

dc.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCh, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, token");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  res.setHeader("Access-Control-Allow-Credentials", true);

  res.setHeader("Access-Control-Max-Age", 3600);

  next();
});

dc.use(express.json());

dc.use('/usuario', usuarioRoute);
dc.use('/contrato', contratoRouter);
// dc.use('/empresa', );
// dc.use('/caja', );
// dc.use('/matodoPago', );
// dc.use('/categoria', );
// dc.use('/codigoBarra', );
// dc.use('/producto', );
// dc.use('/facturaProveedor', );
// dc.use('/cliente', );
// dc.use('/proveedor', );
// dc.use('/notiContrato', );
// dc.use('/cliente', );


dc.listen(port,()=>{
  console.log(`Servidor DOCHER ejecutando en http://localhost:${port}`);
})