import express from 'express';
import { findLikeFeedForUser, getUserProfile, updateUserProfile } from '../controllers/userController';

const router = express.Router();

router.get('/:id', getUserProfile);
router.put('/:id', updateUserProfile);
router.get('/:id/likes', findLikeFeedForUser); // 사용자가 좋아요한 피드 가져오기

export { router };
