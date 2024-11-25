// influencer.ts

import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../util/database';
import { User } from './user'; // User 모델 가져오기

// InfluencerAttributes 정의: 모델에서 실제 사용하는 데이터 필드
export interface InfluencerAttributes {
  id: number;
  user_id: number;
  follower: any[]; // JSON 형태로 저장되는 팔로워 정보
  banner_picture?: string;
  category?: string;
  created_at?: Date;
  modified_at?: Date;
}

// InfluencerCreationAttributes 정의: Influencer 모델 생성 시 필요한 필드
type InfluencerCreationAttributes = Optional<
  InfluencerAttributes,
  'id' | 'created_at' | 'modified_at'
>;

// Influencer 모델 정의
export const Influencer = sequelize.define<
  Model<InfluencerAttributes, InfluencerCreationAttributes>
>(
  'Influencer',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, // User 모델 참조
        key: 'id', // User 테이블의 id 필드 참조
      },
      onDelete: 'CASCADE', // User 삭제 시 연결된 Influencer 삭제
    },
    follower: {
      type: DataTypes.JSON, // JSON 타입
      defaultValue: [], // 기본값 빈 배열
      allowNull: false,
    },
    banner_picture: {
      type: DataTypes.STRING(255), // VARCHAR(255)
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING(255), // VARCHAR(255)
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE, // TIMESTAMP
      defaultValue: DataTypes.NOW, // CURRENT_TIMESTAMP
    },
    modified_at: {
      type: DataTypes.DATE, // TIMESTAMP
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      allowNull: false,
    },    
  },
  {
    timestamps: true, // createdAt과 updatedAt 자동 생성 활성화
    createdAt: 'created_at',
    updatedAt: 'modified_at',
    tableName: 'Influencer', // 테이블 이름 명시
  }
);

// User와의 관계 설정 (1:1 관계)
User.hasOne(Influencer, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Influencer.belongsTo(User, { foreignKey: 'user_id' });
