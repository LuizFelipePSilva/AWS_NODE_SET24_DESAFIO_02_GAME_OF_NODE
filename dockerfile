# Usa uma imagem base do Node.js
FROM node:18

# Define o diretório de trabalho
WORKDIR /app

# Copia o package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Compila o código TypeScript
RUN npm run dev

# Expõe a porta na qual o servidor irá rodar
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "run", "dev"]