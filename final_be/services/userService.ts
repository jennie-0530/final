import { User } from "../models/user";
import { Influencer } from "../models/influencer";
import { sequelize } from "../util/database";

interface InfluencerData {
  id?: number;
  follower?: string;
  banner_picture?: string;
  category?: string;
}

interface UserData {
  username: string;
  email: string;
  password: string;
  id?: number;
  about_me?: string;
  profile_picture?: string;
}

// 사용자 ID로 사용자 정보 조회
export const getUserById = async (userId: number) => {
  try {
    const user = await User.findOne({
      where: { id: userId },
      include: [
        {
          model: Influencer,
          attributes: ["id", "follower", "banner_picture", "category"],
        },
      ],
      attributes: ["id", "username", "email", "about_me", "profile_picture"],
      raw: true,
      nest: true,
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Error fetching user");
  }
};

// 사용자 정보 업데이트
export const updateUser = async (
  userId: number,
  updates: Partial<UserData & { influencer: Partial<InfluencerData> }>
) => {
  try {
    const { influencer, ...userUpdates } = updates;

    console.log("User updates:", userUpdates); // User 업데이트 데이터 확인
    const [affectedRows] = await User.update(userUpdates, {
      where: { id: userId },
    });

    if (affectedRows === 0) {
      throw new Error("User not found");
    }

    if (influencer) {
      console.log("Influencer updates:", influencer); // 업데이트 데이터 확인
      const [influencerInstance, created] = await Influencer.findOrCreate({
        where: { user_id: userId },
        defaults: {
          banner_picture: influencer.banner_picture || null,
          category: influencer.category || null,
        },
      });
    
      if (!created) {
        await influencerInstance.update(influencer);
      }
    }

    const updatedUser = await User.findOne({
      where: { id: userId },
      include: [{ model: Influencer }],
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Error updating user");
  }
};


export const findFollowingsByUser = async (userId: number) => {
  try {
    const follows = await Influencer.findAll({
      where: sequelize.literal(`JSON_CONTAINS(follower, '"${userId}"')`),
      attributes: ["id", "user_id", "follower", "category"],
      include: [
        {
          model: User,
          attributes: ["username", "about_me", "profile_picture"], // 필요한 User 속성만 포함
        },
      ],
      raw: true,
      nest: true, // 중첩된 결과를 객체로 반환
    });

    console.log("follows with user info: ", follows);
    return follows;
  } catch (error) {
    console.error("Error fetching followers by user:", error);
    throw new Error("Error fetching followers by user");
  }
};
