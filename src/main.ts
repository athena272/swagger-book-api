// IMPORTANTE: Carregar dotenv usando require ANTES de qualquer import ES6
const dotenv = require("dotenv");
dotenv.config();

// Agora sim, importar outros módulos
import app from "./app";

function main() {
  app.listen(3000, "localhost", () => {
    console.log("Server running at port 3000");
  });
}

main();
