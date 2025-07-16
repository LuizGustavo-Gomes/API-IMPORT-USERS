import express from 'express';
import { importUsersService } from '../services/importService.js';

const router = express.Router();

router.post('/import-users', async (req, res) => {
    const prisma = req.prisma;

    try {
        const result = await importUsersService(prisma);
        res.status(200).json(result);
    } catch (error) {
        console.error('Erro na rota /import-users:', error);
        res.status(500).json({ error: error.message || 'Erro interno do servidor.' });
    }
});

export default router;