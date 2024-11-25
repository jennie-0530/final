import { User } from '../models/user';
import { Influencer } from '../models/influencer';
import { Feed } from '../models/feed'; // Feed 모델 임포트

interface FeedData {
  influencer_id: number;
  // nickname: string;
  description: string;
  visibility_level: string;
  thumbnail: string[]; // 업로드된 썸네일 이미지 URL
  product: { link: string; img: string; title: string }[]; // 업로드된 제품 이미지 URL (link와 img가 묶인 객체 배열)
  likes: string[];
}

export const saveFeedToDB = async (feedData: FeedData) => {
  try {
    // 새 피드 정보 DB에 저장
    const feed = await Feed.create({
      influencer_id: feedData.influencer_id, // influencer_id 매핑
      content: feedData.description, // content 필드 매핑
      images: JSON.stringify(feedData.thumbnail), // JSON으로 변환
      // username: feedData.nickname,
      // JSON.stringify를 사용해서 문자열로 변환
      products: feedData.product as {
        link: string;
        img: string;
        title: string;
      }[],
      visibility_level: Number(feedData.visibility_level), // 가시성 수준
      likes: [], // 기본값 빈 배열로 설정
    });

    return feed;
  } catch (error) {
    console.error('Error saving feed to DB:', error);
    throw new Error('Error saving feed to DB');
  }
};
// 특정 ID의 피드 가져오기
export const getFeedById = async (id: number) => {
  try {
    const feed = await Feed.findOne({
      where: { id },
      attributes: [
        'id',
        'influencer_id',
        'content',
        'images',
        'products',
        'visibility_level',
        'likes',
      ],
      include: [
        {
          model: Influencer,
          as: 'influencer', // 관계 이름

          include: [
            {
              model: User,
              as: 'user', // 관계 이름
              attributes: ['username'], // User 테이블에서 username만 가져오기
            },
          ],
        },
      ],
    });

    if (!feed) {
      throw new Error('Feed not found');
    }

    // 모델 데이터를 일반 객체로 변환
    const parsedFeed = feed.toJSON();
    const result = {
      ...parsedFeed,
      influencer: parsedFeed?.influencer?.user?.username, // influencer에서 username만 추출
    };

    return result;
  } catch (error) {
    console.error('Error fetching feed by ID:', error);
    throw new Error('Error fetching feed by ID');
  }
};
