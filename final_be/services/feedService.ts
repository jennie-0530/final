import { Feed } from '../models/feed'; // Feed 모델 임포트

interface FeedData {
  influencer_id: number;
  nickname: string;
  title: string;
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
      content: feedData.title, // content 필드 매핑
      images: JSON.stringify(feedData.thumbnail), // JSON으로 변환
      products: JSON.stringify(feedData.product), // JSON으로 변환
      visibility_level: feedData.visibility_level, // 가시성 수준
      likes: JSON.stringify([]), // 기본값 빈 배열로 설정
    });

    return feed;
  } catch (error) {
    console.error('Error saving feed to DB:', error);
    throw new Error('Error saving feed to DB');
  }
};
