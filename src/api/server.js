const port = process.env.PORT || 3003;
const app = require("./app");

app.listen(port);
console.log("Desenvolvido por Isaac Magno");
console.log(`API Online na porta ${port}`);
