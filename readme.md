# API da Livraria Página 42

Esta é uma API de consulta para o desafio de React. Ela fornece os oito livros da Página 42. Não há cadastro, edição, remoção ou persistência de dados.

## Endereço da API

Após o deploy no Render, substitua `URL_DO_RENDER` pela URL pública do serviço:

```text
https://pagina-42-livros-api.onrender.com/api/livros
```

## Chave de API da turma

Use esta chave em todas as requisições:

```text
FpHaY6No10dqse01yRYt2ZY-ELqp8Kw4FI4eMXAj7_E
```

## Consultar os livros

Faça uma requisição `GET` para `/api/livros` e envie a chave no cabeçalho `x-api-key`.

```js
const resposta = await fetch("https://pagina-42-livros-api.onrender.com/api/livros", {
  headers: {
    "x-api-key": "FpHaY6No10dqse01yRYt2ZY-ELqp8Kw4FI4eMXAj7_E",
  },
});

if (!resposta.ok) {
  throw new Error("Não foi possível carregar os livros.");
}

const livros = await resposta.json();
```

A resposta é um array de objetos. Cada livro tem `id`, `titulo`, `autor`, `categoria`, `preco`, `cor`, `descricao`, `paginas`, `editora` e `ano`. O preço está em centavos.

## Respostas possíveis

| Situação | Status | Resposta |
| --- | --- | --- |
| Chave enviada corretamente | 200 | Array de livros |
| Chave ausente ou incorreta | 401 | `{ "erro": "Chave de API inválida ou ausente." }` |
| Caminho inexistente | 404 | `{ "erro": "Rota não encontrada." }` |

## Verificar a API

O endereço `https://pagina-42-livros-api.onrender.com/health` é público e responde:

```json
{ "status": "ok" }
```

## Publicar no Render

1. Publique esta pasta em um repositório GitHub, GitLab ou Bitbucket.
2. No Render, crie um Blueprint a partir do repositório. O arquivo `render.yaml` já contém a configuração do serviço.
3. Quando o Render pedir `API_KEY`, cole a chave da turma indicada acima.
4. O deploy inicial já foi feito. O Render atualizará o serviço automaticamente quando novas alterações forem enviadas para `main`.
