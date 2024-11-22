import { Request, Response } from "express";
import { findFollowingsByUser, getUserById, updateUser } from "../services/userService";
import { findFeedsByUser, findFeedsLikedByUser } from "../services/feedService"; // feedService에서 함수 가져오기
import { formatUserResponse } from "../util/userResponse"; // 유틸 함수 가져오기

// 사용자 정보 조회
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await getUserById(Number(req.params.id));
    const response = formatUserResponse(user);
    res.status(200).json(response);
  } catch (error) {
    console.error("사용자 정보 가져오기 오류:", error);
    res.status(500).json({ error: "사용자 정보를 가져오는 중 오류가 발생했습니다." });
  }
};

// 사용자 정보 업데이트
export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedUser = await updateUser(Number(req.params.id), req.body);
    const response = formatUserResponse(updatedUser);
    res.status(200).json(response);
  } catch (error) {
    console.error("사용자 업데이트 오류:", error);
    res.status(500).json({ error: "사용자 정보를 업데이트하는 중 오류가 발생했습니다." });
  }
};

// 사용자가 좋아요한 피드 조회
export const findLikeFeedForUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const feeds = await findFeedsLikedByUser(Number(req.params.id));
    
    if (!feeds || feeds.length === 0) {
      res.status(404).json({ error: "사용자가 좋아요한 피드를 찾을 수 없습니다." });
      return;
    }
    
    res.status(200).json(feeds);
  } catch (error) {
    console.error("사용자가 좋아요한 피드 가져오기 오류:", error);
    res.status(500).json({ error: "사용자가 좋아요한 피드를 가져오는 중 오류가 발생했습니다." });
  }
};

// 사용자가 작성한 피드 조회
export const findFeedsForUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const feeds = await findFeedsByUser(Number(req.params.id));
    
    if (!feeds || feeds.length === 0) {
      res.status(404).json({ error: "사용자가 작성한 피드를 찾을 수 없습니다." });
      return;
    }
    
    res.status(200).json(feeds);
  } catch (error) {
    console.error("사용자가 작성한 피드 가져오기 오류:", error);
    res.status(500).json({ error: "사용자가 작성한 피드를 가져오는 중 오류가 발생했습니다." });
  }
};

// 사용자가 팔로우한 인플루언서 조회
export const findFollowInfluencerForUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const followings = await findFollowingsByUser(Number(req.params.id));
    
    if (!followings || followings.length === 0) {
      res.status(404).json({ error: "사용자가 팔로우한 인플루언서를 찾을 수 없습니다." });
      return;
    }
    
    res.status(200).json(followings);
  } catch (error) {
    console.error("사용자가 좋아요한 피드 가져오기 오류:", error);
    res.status(500).json({ error: "사용자가 좋아요한 피드를 가져오는 중 오류가 발생했습니다." });
  }
};

