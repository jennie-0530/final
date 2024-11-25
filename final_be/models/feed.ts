import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../util/database';

// FeedAttributes 정의: 모델에서 실제 사용하는 데이터 필드
export interface FeedAttributes {
  id: number;
  influencer_id: number;
  content?: string;
  images?: string[] | string; // images는 JSONB로 배열로 저장
  products?: { link: string; img: string; title: string }[]; // products는 JSONB로 객체 배열
  visibility_level?: number;
  likes?: string[]; // 좋아요 목록
  created_at?: Date;
  modified_at?: Date;
  influencer?: { user: { username: string } };
}

// FeedCreationAttributes 정의: 피드를 생성할 때 필요한 필드
type FeedCreationAttributes = Optional<
  FeedAttributes,
  | 'id'
  | 'influencer_id'
  | 'content'
  | 'images'
  | 'products'
  | 'visibility_level'
  | 'likes'
>;

// 모델 정의
export const Feed = sequelize.define<
  Model<FeedAttributes, FeedCreationAttributes>
>(
  'Feed',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    influencer_id: { type: DataTypes.INTEGER, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: true },
    images: { type: DataTypes.JSONB, allowNull: true }, // images 필드 정의
    products: { type: DataTypes.JSONB, allowNull: true }, // products 필드 정의
    visibility_level: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },
    likes: { type: DataTypes.JSONB, allowNull: true },
  },
  {
    timestamps: true, // Sequelize가 기본적으로 createdAt, updatedAt 관리
    createdAt: 'created_at', // DB에서 이름을 created_at으로 설정
    updatedAt: 'modified_at', // DB에서 이름을 modified_at으로 설정
    tableName: 'Feed',
  }
);
