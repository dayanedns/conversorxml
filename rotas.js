const express = require ('express');
const cors = require('cors')
const app = express();

app.use(cors())
/*
* Serve os arquivos de front-end
* o que for utilizado pela interface é exposto por aqui, nas respectivas rotas expostas
*   Boa prática: mandar arquivos para uma pasta tipo /public ou /client,
*   e servir esta pasta completa com app.use() (cheque documenação do express sobre como usar: https://expressjs.com/en/4x/api.html#app.use) 
*/
app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.get("/dbBanco.js", function(req, res){
  res.sendFile(__dirname + "/dbBanco.js");
});
app.get("/index.js", function(req, res){
  res.sendFile(__dirname + "/index.js");
});

app.get("/bundle.js", function(req, res){
  res.sendFile(__dirname + "/bundle.js");
});

/*
* Rotas da api:
* Aqui que irão as rotas que retornam informações do servidor e por onde o servidor recebe informações do client, usando a arquitetura de REST API
*/ 
app.get('/api/hello', (request, response)=>{
  // Acesse usando a rota: http://localhost:8080/api/hello/

  return response.json({
    message: `Olá Daiane!`
  })
})

app.listen(8080, function(){
  console.log("Servidor rodando url http://localhost:8080");
});
