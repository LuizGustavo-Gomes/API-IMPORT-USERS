import express from 'express';
import { PrismaClient } from '../generated/prisma/index.js';
import importRoutes from './routes/importRoutes.js';

const app = express();
const port = 3000;
const prisma = new PrismaClient();

app.use(express.json());

app.use((req, res, next) => {
    req.prisma = prisma;
    next();
});

app.use('/', importRoutes);

app.get('/', (req, res) => {
    res.send('Bem Vindo!');
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
    console.log(`Acesse http://localhost:${port}`);
    console.log(`Para importar usuários, envie uma requisição POST para http://localhost:${port}/import-users`);
});