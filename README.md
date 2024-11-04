# Compass CAR

API para um sistema de compra de carros, com autenticação, CRUD para usuários, clientes, carros e pedidos, além de autenticação e autorização de acessos. O projeto utiliza arquitetura modular, visando facilitar a escalabilidade e manutenibilidade.


## Criadores
| CRIADOR   | GIT                           | Responsabilidade
| :---------- | :---------------------------------- | :----------
| `LUIZ FELIPE` |  LuizFelipePSilva | `API ORDER`
| `MARCOS HENRIQUE` | marcoshgss | `API CLIENTS`
| `RIGOBERTO`| Rigobertto |  `API CARS`
| `FABRICIO`| FabricioDangellis | `API USERS`


## Tabela de Conteúdos

- [Configuração do Projeto](#configuração-do-projeto)
- [Autenticação e Autorização](#autenticação-e-autorização)
- [Endpoints](#endpoints)
    - [Usuários](#usuários)
    - [Clientes](#clientes)
    - [Carros](#carros)
    - [Pedidos de Compra](#pedidos-de-compra)
- [Gerenciamento de Equipe](#gerenciamento-de-equipe)



### Requisitos

- **Node.js**
- **TypeScript**
- **Docker**
- **Pretiier**
- **Eslint**

### Passo a Passo

1. Clone o repositório:
    ```bash
    https://github.com/LuizFelipePSilva/AWS_NODE_SET24_DESAFIO_02_GAME_OF_NODE.git
    ```
1. Clone o repositório:
    ```bash
    cd AWS_NODE_SET24_DESAFIO_02_GAME_OF_NODE
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```
3. Configure o banco de dados e o arquivo `.env` com as credenciais necessárias.
```http
 .ENV
```

| Parâmetro   | Descrição                           |
| :---------- | :---------------------------------- |
| `APP_SECRET` | `5317fce602b6a53bea1d22b20ea22393` 
| `DB_HOST` | `localhost`
| `DB_PORT`| `5433`
| `DB_USER`| `compassuser`
| `DB_PASS`| `compasspass`
| `DB_NAME`| `compasscar_db`

4. Crie o Container Docker:
    ```bash
    docker-compose up -d --build
    ```
5. Inicie a aplicação:
    ```bash
    npm run typeorm -- migration:run

6. Inicie a aplicação:
    ```bash
    npm run dev
    ```

## Autenticação e Autorização

### Autenticação de Usuário

- A autenticação é feita com base em e-mail e senha.
- Token JWT gerado com expiração de 10 minutos.

### Autorização

- As APIs protegidas requerem um token JWT válido para acesso.
- Usuários não autenticados não têm acesso às rotas privadas.



### Rota de Autênticação

| email   | SENHA                           |
| :---------- | :---------------------------------- |
| `admin@gmail.com` | `12345678` 

* Usuário criado para fim de testes


- Endpoint:  `POST /api/sessions`
- **Requisição (JSON):**
- **Use o Modo Bearer Token no Auth e cole o token que veio no login/Session**
```json
{
	"email": "admin@gmail.com",
	"password": "12345678"
}
```
- **Exemplo de Resposta (JSON):**
```json
{
	"user": {
		"id": "6b4b6047-6b9c-4148-bb94-5b22969bb62a",
		"fullName": "admin",
		"email": "admin@gmail.com",
		"createdAt": "2024-11-04T19:53:22.753Z",
		"deletedAt": null
	},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzA3NTAxNTksImV4cCI6MTczMDgzNjU1OSwic3ViIjoiNmI0YjYwNDctNmI5Yy00MTQ4LWJiOTQtNWIyMjk2OWJiNjJhIn0.doamSwLYjW9oJP9ucI01C7K_x3EG-3Vx8LiIOphtAic"
}
```

## Endpoints

### Usuários

#### Criação de Usuário 

- Endpoint:  `POST /api/users`
- **Autenticação**: Usuários autenticados.
- **Exemplo de Requisição (JSON):**
```json
{
	"fullName": "teste",
	"email": "teste12@gmail.com",
	"password": "12345678"
}
```
- **Exemplo de Resposta (JSON):**
```json
{
	"fullName": "teste",
	"email": "teste12@gmail.com",
	"createdAt": "2024-11-04T17:56:12.727Z",
	"deletedAt": null,
	"id": "2b427b88-3b3e-49c3-aa8e-793fc86fa97d"
}
```

#### Visualização de Usuário

- Endpoint:  `GET /api/users/:id`
- **Autenticação**: Usuários autenticados.

- **Exemplo de Resposta (JSON):**
```json
{
	"id": "2b427b88-3b3e-49c3-aa8e-793fc86fa97d",
	"fullName": "teste",
	"email": "teste12@gmail.com",
	"createdAt": "2024-11-04T17:56:12.727Z",
	"deletedAt": null
}
```

#### Listagem de Usuários

- Endpoint:  `GET /api/users/`
- **Autenticação**: Usuários autenticados.

- **Exemplo de Resposta (JSON):**
```json
{
{
	"quant_pages": 1,
	"totalUsers": 2,
	"current_page": 1,
	"data": [
		{
			"id": "c1a6abde-d4e3-4d71-9f22-f849daec753a",
			"fullName": "Luiz Felipe Pereira",
			"email": "felipe123@gmail.com",
			"createdAt": "2024-11-03T22:34:30.629Z",
			"deletedAt": null
		},
		{
			"id": "2b427b88-3b3e-49c3-aa8e-793fc86fa97d",
			"fullName": "teste",
			"email": "teste12@gmail.com",
			"createdAt": "2024-11-04T17:56:12.727Z",
			"deletedAt": null
		}
	]
}
}
```

#### Atualização de Usuário 

- Endpoint:  `PATCH /api/users/:id`
- **Autenticação**: Usuários autenticados.
- **Campos**: Nome e email (não permite alteração de ID e datas).

- **Exemplo de Requisição (JSON):**
```json
{
	"fullName": "teste2",
}
```
- **Exemplo de Resposta (JSON):**
```json
{
	"id": "2b427b88-3b3e-49c3-aa8e-793fc86fa97d",
	"fullName": "teste2",
	"email": "teste12@gmail.com",
	"createdAt": "2024-11-04T17:56:12.727Z",
	"deletedAt": null
}
```

#### Exclusão de Usuário 

- Endpoint:  `DELETE /api/users/:id`
- **Autenticação**: Usuários autenticados.



---

### Clientes

#### Criação de Cliente (POST /clientes)

- Endpoint:  `POST /api/clients`
- **Autenticação**: Usuários autenticados.
- **Exemplo de Requisição (JSON):**
```json
{
"fullName": "teste1",
"birthDate":"2006-05-01",
"cpf": "43768948005",
"email": "teste1@gmail.com"
}
```
- **Exemplo de Resposta (JSON):**
```json
{
	"fullName": "teste1",
	"birthDate": "2006-05-01T00:00:00.000Z",
	"cpf": "43768948005",
	"email": "teste1@gmail.com",
	"phone": null,
	"deletedAt": null,
	"id": "c3642ba4-1112-46ae-81de-abdbc2adf43c",
	"createdAt": "2024-11-04T21:13:19.198Z"
}
```

#### Visualização de Cliente 

- Endpoint:  `GET /api/clients/:id`
- **Autenticação**: Usuários autenticados.
- **Exemplo de Requisição (JSON):**

- **Exemplo de Resposta (JSON):**
```json
{
	"id": "c3642ba4-1112-46ae-81de-abdbc2adf43c",
	"fullName": "teste1",
	"birthDate": "2006-04-30",
	"cpf": "43768948005",
	"email": "teste1@gmail.com",
	"phone": null,
	"createdAt": "2024-11-04T21:13:19.198Z",
	"deletedAt": null,
	"orders": []
}
```

#### Listagem de Clientes (GET /clientes)

- **Autenticação**: Usuários autenticados.
- **Filtros**: nome, email, CPF, excluído (sim/não)
- **Paginação**: Suportada.

#### Atualização de Cliente (PUT /clientes/:id)

- Endpoint:  `PATCH /api/clients/:id`
- **Autenticação**: Usuários autenticados.
- **Exemplo de Requisição (JSON):**
```json
{
"fullName": "teste2"
}
```
- **Exemplo de Resposta (JSON):**
```json
{
	"id": "c3642ba4-1112-46ae-81de-abdbc2adf43c",
	"fullName": "teste12",
	"birthDate": "2006-04-30",
	"cpf": "43768948005",
	"email": "teste1@gmail.com",
	"phone": null,
	"createdAt": "2024-11-04T21:13:19.198Z",
	"deletedAt": null,
	"orders": []
}
```


#### Exclusão de Cliente 

- Endpoint:  `DELETE /api/clients/:id`
- **Autenticação**: Usuários autenticados.

---

### Carros

#### Criação de Carro 

- Endpoint:  `POST /api/cars`
- **Autenticação**: Usuários autenticados.
- **Exemplo de Requisição (JSON):**
```json
{
    "plate": "RYZEN1",
    "mark": "bmw",
    "model": "Fiant",
    "km": 123,
    "year": 2020,
    "price": 10,
    "items": ["pneus", "motor", "banco"]
}
```
- **Exemplo de Resposta (JSON):**
```json
{
	"plate": "RYZEN1",
	"mark": "bmw",
	"model": "Fiant",
	"km": 123,
	"year": 2020,
	"price": 10,
	"status": 0,
	"createdAt": "2024-11-04T18:33:05.782Z",
	"updatedAt": "2024-11-04T18:33:05.782Z",
	"id": "7d9d200c-c700-4836-89c5-051bdb7112e5"
}
```

#### Visualização de Carro (GET /carros/:id)

- Endpoint:  `GET /api/cars/:id`
- **Autenticação**: Usuários autenticados.

- **Exemplo de Resposta (JSON):**
```json
{
	"id": "39b0b746-5c8a-4de3-ab08-dd554ba497f3",
	"plate": "RYZEN",
	"mark": "bmw",
	"model": "Fiant",
	"km": 123,
	"year": 2020,
	"price": 10,
	"status": 2,
	"createdAt": "2024-11-04T17:41:48.968Z",
	"updatedAt": "2024-11-04T18:26:38.547Z",
	"items": [
		{
			"id": "4e57700f-4ccd-4a14-8742-340d6aa96c69",
			"name": "pneus",
			"createdAt": "2024-11-04T17:41:49.209Z",
			"updatedAt": "2024-11-04T17:41:49.209Z"
		},
		{
			"id": "059420a7-4f70-45c1-8c65-bf4d60227314",
			"name": "motor",
			"createdAt": "2024-11-04T17:41:49.209Z",
			"updatedAt": "2024-11-04T17:41:49.209Z"
		},
		{
			"id": "b0830945-44d3-440f-996a-96e2fcc40fe2",
			"name": "banco",
			"createdAt": "2024-11-04T17:41:49.209Z",
			"updatedAt": "2024-11-04T17:41:49.209Z"
		}
	]
} 
```

#### Listagem de Carros (GET /carros)

- Endpoint:  `GET /api/cars/`
- **Autenticação**: Usuários autenticados.

- **Exemplo de Resposta (JSON):**
```json
{
	"data": [
		{
			"id": "7d9d200c-c700-4836-89c5-051bdb7112e5",
			"plate": "RYZEN1",
			"mark": "bmw",
			"model": "Fiant",
			"km": 123,
			"year": 2020,
			"price": 10,
			"status": 0,
			"createdAt": "2024-11-04T18:33:05.782Z",
			"updatedAt": "2024-11-04T18:33:05.782Z"
		},
	],
	"total": 1,
	"page": 1,
	"limit": 10
}
```

#### Atualização de Carro (PUT /carros/:id)

- Endpoint:  `PATCH /api/cars/:id`
- **Autenticação**: Usuários autenticados.
- **Exemplo de Requisição (JSON):**
```json
{
	"price": 2100
}
```
- **Exemplo de Resposta (JSON):**
```json
{
	"id": "7d9d200c-c700-4836-89c5-051bdb7112e5",
	"plate": "RYZEN1",
	"mark": "bmw",
	"model": "Fiant",
	"km": 123,
	"year": 2020,
	"price": 2100,
	"status": 0,
	"createdAt": "2024-11-04T18:33:05.782Z",
	"updatedAt": "2024-11-04T18:36:44.366Z",
	"items": [
		{
			"id": "56640112-1e10-4927-9aac-bc1bce649cd3",
			"name": "pneus",
			"createdAt": "2024-11-04T18:33:05.833Z",
			"updatedAt": "2024-11-04T18:33:05.833Z"
		},
		{
			"id": "b6be486b-5b6d-43be-a36d-0b772c203bc1",
			"name": "motor",
			"createdAt": "2024-11-04T18:33:05.833Z",
			"updatedAt": "2024-11-04T18:33:05.833Z"
		},
		{
			"id": "32306966-4031-4044-89d3-7b96b5c36e2e",
			"name": "banco",
			"createdAt": "2024-11-04T18:33:05.833Z",
			"updatedAt": "2024-11-04T18:33:05.833Z"
		}
	]
}
```
#### Exclusão de Carro (DELETE /carros/:id)

- Endpoint:  `DELETE /api/cars/:id`
- **Autenticação**: Usuários autenticados.


---

### Pedidos de Compra

#### Criação de Pedido 

- Endpoint:  `POST /api/orders`
- **Validações**: Cada cliente só pode ter um pedido aberto por vez.
- **Autenticação**: Usuários autenticados.
- **Exemplo de Requisição (JSON):**
```json
{
"clientId":"6aab797b-7358-48c4-9284-9c0aa21e4afd",
"carId": "67717206-6660-48fc-9713-1ca0297f0cef",
"cep": "59695000",
"value": 10001
}
```
- **Exemplo de Resposta (JSON):**
```json
{
	"clientId": "6aab797b-7358-48c4-9284-9c0aa21e4afd",
	"clientName": "Luiz Felipe",
	"clientEmail": "feipe12@gmail.com",
	"orderDate": "2024-11-04T19:00:05.556Z",
	"status": "Aberto",
	"cep": "59695000",
	"city": "Baraúna",
	"uf": "RN",
	"totalValue": 10001,
	"carId": "67717206-6660-48fc-9713-1ca0297f0cef",
	"purchaseDate": null,
	"cancellationDate": null,
	"deletedAt": null,
	"id": "8ccdf5cf-245b-419a-8fa1-f34fa56f4c87"
}
```

#### Visualização de Pedido 

- Endpoint:  `GET /api/orders/:id`
- **Validações**: Cada cliente só pode ter um pedido aberto por vez.

- **Exemplo de Resposta (JSON):**
```json
	"order": {
		"id": "8ccdf5cf-245b-419a-8fa1-f34fa56f4c87",
		"clientId": "6aab797b-7358-48c4-9284-9c0aa21e4afd",
		"clientName": "Luiz Felipe",
		"clientEmail": "feipe12@gmail.com",
		"orderDate": "2024-11-04T19:00:05.556Z",
		"status": "Aberto",
		"cep": "59695000",
		"city": "Baraúna",
		"uf": "RN",
		"totalValue": 10001,
		"carId": "67717206-6660-48fc-9713-1ca0297f0cef",
		"purchaseDate": null,
		"cancellationDate": null
	},
	"client": {
		"id": "6aab797b-7358-48c4-9284-9c0aa21e4afd",
		"fullName": "Luiz Felipe",
		"cpf": "15772070410",
		"email": "feipe12@gmail.com"
	},
	"car": {
		"id": "67717206-6660-48fc-9713-1ca0297f0cef",
		"plate": "OKC4C98D",
		"mark": "FIAT",
		"model": "Strada",
		"km": 99,
		"year": 2019,
		"items": [
			{
				"name": "ArCondicionado"
			},
			{
				"name": "Geral"
			}
		]
	}
}
```

#### Listagem de Pedidos

- Endpoint:  `GET /api/orders`
- **Validações**: Cada cliente só pode ter um pedido aberto por vez.

- **Exemplo de Resposta (JSON):**
```json
{
	"per_page": 10,
	"data": [
		{
			"id": "8ccdf5cf-245b-419a-8fa1-f34fa56f4c87",
			"status": "Aberto",
			"orderDate": "2024-11-04T19:00:05.556Z",
			"purchaseDate": null,
			"cancellationDate": null,
			"totalValue": 10001,
			"cep": "59695000",
			"city": "Baraúna",
			"uf": "RN",
			"clientId": "6aab797b-7358-48c4-9284-9c0aa21e4afd",
			"clientName": "Luiz Felipe",
			"clientCpf": "15772070410"
		}
	],
	"total": 1,
	"current_page": 1,
	"last_page": 1
}
```

#### Atualização de Pedido 

- Endpoint:  `PATCH /api/orders/:id`
- **Validações**: Cada cliente só pode ter um pedido aberto por vez.
- **Autenticação**: Usuários autenticados.
- **Exemplo de Requisição (JSON):**
```json
{
	"status": "Aprovado"
}
```
- **Exemplo de Resposta (JSON):**
```json
{
	"id": "8ccdf5cf-245b-419a-8fa1-f34fa56f4c87",
	"clientId": "6aab797b-7358-48c4-9284-9c0aa21e4afd",
	"clientName": "Luiz Felipe",
	"clientEmail": "feipe12@gmail.com",
	"orderDate": "2024-11-04T19:00:05.556Z",
	"status": "Aprovado",
	"cep": "59695000",
	"city": "Baraúna",
	"uf": "RN",
	"totalValue": 10001,
	"carId": "67717206-6660-48fc-9713-1ca0297f0cef",
	"purchaseDate": "2024-11-04T19:03:42.850Z",
	"cancellationDate": null,
	"deletedAt": null
}
```

#### Cancelamento de Pedido 

- **Autenticação**: Usuários autenticados.
- **Soft Delete**: Marca o status como "cancelado".
- Endpoint:  `DELETE /api/orders/:id`

---


Este README contém as principais informações para executar e utilizar a API Compass CAR. Consulte a documentação no Swagger para detalhes adicionais e parâmetros específicos de cada rota.