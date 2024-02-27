import { Router } from 'express';
import { createComment } from '../controllers/comments.js';
import { checkAuth } from '../middlewares/checkAuth.js';

const router = new Router();

router.post('/:id', checkAuth, createComment);

export default router;
