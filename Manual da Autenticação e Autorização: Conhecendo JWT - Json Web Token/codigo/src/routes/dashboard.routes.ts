import { Router } from 'express';
import { authMiddleware, AuthPayload } from '../middleware/auth';

const router = Router();

router.get('/dashboard', authMiddleware, (req, res) => {
  const user = (req as any).user as AuthPayload;
  return res.json({ message: `Bem-vindo, ${user.email}!` });
});

export default router;
