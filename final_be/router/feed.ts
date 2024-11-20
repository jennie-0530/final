import express from 'express';
import { FeedWrite } from '../controllers/feedController';

const router = express.Router();

router.post('/', FeedWrite);

export { router };
