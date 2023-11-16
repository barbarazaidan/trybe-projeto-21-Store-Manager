# Projeto Store Manager
## Este repositório contém o desenvolvimento do meu 21º projeto na Trybe

O objetivo deste projeto foi desenvolver uma API Restful com o uso de arquitetura em camadas. Durante a implementação, o banco de dados usado foi o MySQL, e desenvolvi endpoints para criar, visualizar, deletar e atualizar produtos e vendas. Também desenvolvi testes para verificar se tudo estava sendo desenvolvido corretamente.

### Detalhes do projeto

Confira os requisitos exigidos pela Trybe (texto extraído dos readme oficial da Trybe):

**01 - Crie endpoints para listar produtos**

<details><summary>Detalhes</summary>
<p>

> O endpoint para listar produtos deve ser acessível através do caminho `GET /products` e `GET /products/:id`;
> O resultado da listagem deve ser **ordenado** de forma crescente pelo campo `id`;
> Crie testes que garantem a funcionalidade implementada;

</p>
</details>

---

**02 - Crie endpoints para listar vendas**

<details><summary>Detalhes</summary>
<p>

> O endpoint para listar vendas deve ser acessível através do caminho `GET /sales` e `GET /sales/:id`;
> O resultado deve ser **ordenado** de forma crescente pelo campo `saleId`, em caso de empate, **ordenar** também de forma crescente pelo campo `productId`;

</p>
</details>

---

**03 - Crie endpoint para cadastrar produtos**

<details><summary>Detalhes</summary>
<p>

> O endpoint deve ser acessível através do caminho `POST /products`;
> Os produtos enviados devem ser salvos na tabela `products` do banco de dados;
> O corpo da requisição deverá seguir o formato abaixo:

```json
{
  "name": "ProdutoX"
}
```
</p>
</details>

---

**04 - Crie validações para o cadastro de produtos**

<details><summary>Detalhes</summary>
<p>

> O endpoint de cadastro de produtos deve retornar mensagens de erro para requisições com dados inválidos;

</p>
</details>

---

**05 - Crie endpoint para cadastrar vendas**

<details><summary>Detalhes</summary>
<p>

> O endpoint de vendas deve ser acessível através do caminho `POST /sales`;
> As vendas enviadas devem ser salvas nas tabelas `sales` e `sales_products` do banco de dados;
> Deve ser possível cadastrar a venda de vários produtos através da uma mesma requisição;
> O corpo da requisição deverá seguir o formato abaixo:

```json
[
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]
```

</p>
</details>

---

**06 - Crie validações para o cadastro de vendas**

<details><summary>Detalhes</summary>
<p>

> O endpoint de cadastro de vendas deve retornar mensagens de erro para requisições com dados inválidos;

</p>
</details>

---

**07 - Crie endpoint para atualizar um produto**

<details><summary>Detalhes</summary>
<p>

> O endpoint deve ser acessível através do caminho `PUT /products/:id`;
> O corpo da requisição deve ser validado igual no cadastro;
> O corpo da requisição deverá seguir o formato abaixo:

```json
{
  "name": "Martelo do Batman"
}
```
</p>
</details>

---

**08 - Crie endpoint para deletar um produto**

<details><summary>Detalhes</summary>
<p>

> O endpoint deve ser acessível através do caminho `DELETE /products/:id`;

</p>
</details>

---

### Requisitos Bônus

**09 - Crie endpoint para deletar uma venda**

<details><summary>Detalhes</summary>
<p>

> O endpoint deve ser acessível através do caminho `DELETE /sales/:id`;

</p>
</details>

---

**10 - Crie endpoint para atualizar a quantidade de um produto em uma venda**

<details><summary>Detalhes</summary>
<p>

> O endpoint deve ser acessível através do caminho `/sales/:saleId/products/:productId/quantity`;
> O corpo da requisição receberá um valor `quantity`, que:
    - Deverá ser validado como o valor `quantity` para produtos recebidos na requisição de cadastro de venda;
    - Substituirá o valor atual de `quantity` do produto com o `productId` na venda;
> O corpo da requisição deverá seguir o formato abaixo:

```json
{
  "quantity": 20
}
```

</p>
</details>

---

## Sobre o curso da Trybe
O programa total de estudo conta com mais de 1.500 horas de aulas presenciais e online,divididas ao longo de 12 meses. O conteúdo aborda introdução ao desenvolvimento de software, front-end, back-end, ciência da computação, engenharia de software, metodologias ágeis e habilidades comportamentais.