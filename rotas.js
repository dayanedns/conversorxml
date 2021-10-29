const express = require ('express');
const app = express();

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


app.listen(8080, function(){
  console.log("Servidor rodando url http://localhost:8080");
});
