import express from 'express';
import { FeedWrite } from '../controllers/feedController';

const router = express.Router();

// 라우트에서 upload 미들웨어 먼저 실행
router.post('/', FeedWrite);

export { router };
