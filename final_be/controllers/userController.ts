import { Request, Response } from "express";
import { getUserById, updateUser } from "../services/userService";
import { findFeedsLikedByUser } from "../services/feedService"; // feedService에서 함수 가져오기

// 사용자 정보 조회
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id; // 사용자 ID 가져오기
    if (!userId) {
      res.status(400).json({ error: "사용자 ID가 제공되지 않았습니다." });
      return;
    }

    // 서비스 함수에서 사용자 정보 가져오기
    const user: any = await getUserById(Number(userId));

    if (!user) {
      res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
      return;
    }

    // 사용자와 인플루언서 정보 포함
    const response = {
      id: user.id,
      username: user.username,
      email: user.email,
      about_me: user.about_me,
      profile_picture: user.profile_picture,
      influencer: user.Influencer
        ? {
            follower: user.Influencer.follower,
            banner_picture: user.Influencer.banner_picture,
          }
        : null,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("사용자 정보 가져오기 오류:", error);
    res.status(500).json({ error: "사용자 정보를 가져오는 중 오류가 발생했습니다." });
  }
};

// 사용자 정보 업데이트
export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id; // 경로 매개변수에서 사용자 ID 가져오기
    const updates = req.body; // 업데이트할 데이터 가져오기

    if (!userId) {
      res.status(400).json({ error: "사용자 ID가 제공되지 않았습니다." });
      return;
    }

    const updatedUser: any = await updateUser(Number(userId), updates); // userService의 updateUser 호출

    // 사용자와 인플루언서 정보 포함
    const response = {
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      about_me: updatedUser.about_me,
      profile_picture: updatedUser.profile_picture,
      influencer: updatedUser.Influencer
        ? {
            follower: updatedUser.Influencer.follower,
            banner_picture: updatedUser.Influencer.banner_picture,
          }
        : null,
    };

    res.status(200).json(response); // 업데이트된 사용자 정보 반환
  } catch (error) {
    console.error("사용자 업데이트 오류:", error);
    res.status(500).json({ error: "사용자 정보를 업데이트하는 중 오류가 발생했습니다." });
  }
};

// 사용자가 좋아요한 피드 조회
export const findLikeFeedForUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id; // 사용자 ID 가져오기
    if (!userId) {
      res.status(400).json({ error: "사용자 ID가 제공되지 않았습니다." });
      return;
    }

    // 서비스 함수에서 사용자가 좋아요한 피드 가져오기
    const feeds = await findFeedsLikedByUser(Number(userId));

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
