import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();



const app = express();
app.use(express.json())
app.use(cors());

app.get('/usuarios', async (req, res) => {
    try{
         const users = await prisma.usuarios.findMany()
         res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar usuários" });
    }
})

app.post('/usuarios', async (req, res) => {
    await prisma.usuarios.create({
        data: {
            name: req.body.nome,
            email: req.body.email,
            idade: req.body.idade
        }   
    })
    res.json(req.body);
})

app.delete('/usuarios/:id', async (req, res) => {
    console.log("DELETE chamado para ID:", req.params.id)
    await prisma.usuarios.delete({
        where: {
            id: req.params.id
        }
    })
    return res.status(204).send()
})

app.listen(3000)

//9EJ9OjrTQfq4YYDL