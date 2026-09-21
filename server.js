import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const porta = process.env.PORT || 3000;
const chaveApi = process.env.API_KEY;
const arquivoLivros = fileURLToPath(new URL("./livros.json", import.meta.url));
const livros = JSON.parse(await readFile(arquivoLivros, "utf8"));

if (!chaveApi) {
  throw new Error("Defina a variável de ambiente API_KEY antes de iniciar a API.");
}

function responder(resposta, status, dados) {
  resposta.writeHead(status, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "x-api-key, content-type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json; charset=utf-8",
  });
  resposta.end(JSON.stringify(dados));
}

const servidor = createServer((requisicao, resposta) => {
  if (requisicao.method === "OPTIONS") {
    return responder(resposta, 204, {});
  }

  if (requisicao.method === "GET" && requisicao.url === "/health") {
    return responder(resposta, 200, { status: "ok" });
  }

  if (requisicao.method === "GET" && requisicao.url === "/api/livros") {
    if (requisicao.headers["x-api-key"] !== chaveApi) {
      return responder(resposta, 401, { erro: "Chave de API inválida ou ausente." });
    }

    return responder(resposta, 200, livros);
  }

  return responder(resposta, 404, { erro: "Rota não encontrada." });
});

servidor.listen(porta, "0.0.0.0", () => {
  console.log(`API da Página 42 disponível na porta ${porta}.`);
});
