import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import usuarioService from '../services/usuario.service';

class usuarioController {
    async create(req: Request, res: Response) {
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(req.body.senha, saltRounds);
            req.body.senha = hashedPassword;

            const usuario = await usuarioService.create(req.body);
            res.status(201);
            return res.json(usuario);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar usuário' });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const usuario = await usuarioService.findAll();
            res.status(200);
            return res.json(usuario);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar usuários' });
        }
    }

    async update(req: Request, res: Response) {
        try {
            if (req.body.senha) {
                const saltRounds = 10;
                req.body.senha = await bcrypt.hash(req.body.senha, saltRounds);
            }

            const usuario = await usuarioService.update(req.params.id, req.body);
            res.status(201);
            return res.json(usuario);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao atualizar usuário' });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const usuario = await usuarioService.delete(req.params.id);
            res.status(201);
            return res.json(usuario);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao deletar usuário' });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { nome, senha } = req.body;
            const usuario = await usuarioService.findByName(nome);

            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            const isPasswordValid = await bcrypt.compare(senha, usuario.senha);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Senha incorreta' });
            }

            res.status(200).json({ message: 'Login bem-sucedido' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao fazer login' });
        }
    }
}

export default new usuarioController();
