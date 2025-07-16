API de Importação de Usuários (JSONPlaceholder para PostgreSQL)
🚀 Sobre o Projeto
Este projeto é uma API Node.js simples construída com Express e Prisma ORM. Sua principal funcionalidade é importar dados de usuários (incluindo informações de companhia, endereço e geolocalização) de uma API externa (JSONPlaceholder) e persistí-los em um banco de dados PostgreSQL.

É ideal para quem busca um exemplo prático de:

Consumo de APIs externas (axios).

Persistência de dados com Prisma ORM (operações upsert).

Estruturação de projetos Node.js com módulos ES (ESM).

Configuração de banco de dados PostgreSQL com Prisma.

✨ Funcionalidades
Importação de Usuários: Endpoint POST /import-users para buscar dados de usuários do JSONPlaceholder e salvar/atualizar no banco de dados.

Armazenamento Relacional: Persiste informações de usuários, companhias, endereços e geolocalização em tabelas separadas, mantendo as relações.

Operações upsert: Garante que os dados sejam criados se não existirem, ou atualizados se já existirem, evitando duplicidade e mantendo a integridade.

🛠️ Tecnologias Utilizadas
Node.js

Express.js: Framework web para Node.js.

Prisma ORM: Para interação com o banco de dados.

@prisma/client

prisma (CLI)

PostgreSQL: Banco de dados relacional.

Axios: Cliente HTTP para fazer requisições a APIs externas.

⚙️ Pré-requisitos
Antes de começar, certifique-se de ter instalado:

Node.js (versão 18 ou superior recomendada)

npm (gerenciador de pacotes do Node.js)

PostgreSQL (e um servidor PostgreSQL rodando e acessível)

🚀 Como Rodar o Projeto
Siga os passos abaixo para configurar e executar a aplicação.

Crie um banco de dados PostgreSQL para o projeto (ex: api-get-insert).

Crie um arquivo .env na raiz do seu projeto (API-GET-INSERT/API-GET-INSERT/) com a string de conexão do seu banco de dados:

DATABASE_URL="postgresql://user:password@localhost:5432/api-get-insert?schema=public"
Atenção: Substitua user, password, localhost:5432 e api-get-insert pelos seus dados de conexão do PostgreSQL.

3. Instalar Dependências
Na raiz do projeto, instale todas as dependências:

npm install

4. Configurar e Gerar o Prisma Client
Após instalar as dependências, gere o Prisma Client e aplique as migrações no seu banco de dados. Isso criará as tabelas necessárias:

Bash

npx prisma migrate dev --name init 
# Se for a primeira vez no projeto
# Se você já rodou antes, o nome da sua migração será diferente, como:
# npx prisma migrate dev --name add-unique-company-name
Importante: Responda y quando perguntado se deseja aplicar a migração.

5. Iniciar o Servidor
Após a migração, o servidor pode ser iniciado. Navegue até a pasta src e execute:

cd src
node .\app.js

O servidor estará rodando em http://localhost:3000
