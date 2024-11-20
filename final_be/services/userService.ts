import { User } from '../models/user'; // User 모델 임포트
import { Influencer } from '../models/influencer'; // Influencer 모델 임포트

interface UserData {
  username: string;
  email: string;
  password: string;
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
          attributes: ['follower', 'banner_picture'], // 필요한 필드만 포함
        },
      ],
      attributes: ['id', 'username', 'email', 'about_me', 'profile_picture'], // 필요한 필드만 포함
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw new Error('Error fetching user');
  }
};

export const updateUser = async (userId: number, updates: Partial<UserData>) => {
  try {
    // 사용자 정보 업데이트
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    // 업데이트된 값 적용
    Object.assign(user, updates);
    await user.save();

    // 업데이트된 사용자 정보 반환
    const updatedUser = await getUserById(userId);
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Error updating user');
  }
};
