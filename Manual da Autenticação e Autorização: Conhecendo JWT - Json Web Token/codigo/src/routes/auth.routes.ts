import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

const router = Router();

// Simulated DB
const users: { email: string; password: string }[] = [];

router.post('/register', async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };
  if (!email || !password) return res.status(400).json({ error: 'Email e senha são obrigatórios' });

  const exists = users.find(u => u.email === email);
  if (exists) return res.status(409).json({ error: 'Usuário já existe' });

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });
  return res.json({ message: 'Usuário registrado!' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };
  if (!email || !password) return res.status(400).json({ error: 'Email e senha são obrigatórios' });

  const user = users.find(u => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  const token = jwt.sign({ email: user.email }, env.jwtSecret, { expiresIn: '1h' });
  return res.json({ token });
});

export default router;
