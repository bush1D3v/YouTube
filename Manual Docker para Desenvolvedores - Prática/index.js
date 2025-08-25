const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("🚀 Olá, Dev! Docker funcionando com Node.js!");
});

app.listen(3000, () => console.log("App rodando na porta 3000"));