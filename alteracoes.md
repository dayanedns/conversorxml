# Alterações feitas na aplicação

- Removido todos os arquivos inúteis
- Enviado arquivos referentes ao backend da aplicação (`rotas.js` e `dbBanco.js`) para pasta `backend`
- Renomeado arquivo `rotas.js` para `app.js`
- Alterado sintaxe com que arquivos do frontend são servidos: ao invés de enviar arquivos com função `app.get`, foi usado a função `app.use`, passando a rota `/`, e usando função `express.static` para servir todos os arquivos da pasta `html/`