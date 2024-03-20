import express from 'express';
import body_parser from 'body-parser';
import cors from 'cors';

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

dc.listen(port,()=>{
  console.log(`Servidor DOCHER ejecutando en http://localhost:${port}`);
})