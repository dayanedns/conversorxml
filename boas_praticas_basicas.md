# Boas Práticas básicas no projeto:

- Código das aplicações de client e server (código de cada um destes) é bom separar em pastas distintas. No projeto atual está tudo misturado (inclusive este é parte do motivo da confusão)

- Não manter números mágicos imbutidos no código (tipo a porta do servidor que roda a aplicação). Ex:

Código que roda servidor está:

```js
app.listen(8080, function(){
  console.log("Servidor rodando url http://localhost:8080");
});
```

E seria bom criar uma variável para a porta, ficando:

```js
const port = 8080
...
app.listen(port, function(){
  console.log(`Servidor rodando url http://localhost:${port}`);
});
```

O efeito é o mesmo, porém fica mais organizado, e mais fácil de manter.

- Criar `README.md` do projeto
- Usar estrutura de controller
- Usar um ORM ([sequelize](https://sequelize.org/master/) por exemplo) para manipular a base de dados