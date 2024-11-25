import express from "express";
import { findFeedsForUser, findFollowInfluencerForUser, findLikeFeedForUser, getUserProfile, updateUserProfile } from "../controllers/userController";
import { validateUserId } from "../middlewares/validateUserId";

const router = express.Router();

router.get("/:id", validateUserId, getUserProfile);
router.put("/:id", validateUserId, updateUserProfile);
router.get("/:id/likes", validateUserId, findLikeFeedForUser);
router.get("/:id/follows", validateUserId, findFollowInfluencerForUser);
router.get("/:id/feeds", validateUserId, findFeedsForUser);

export { router };
