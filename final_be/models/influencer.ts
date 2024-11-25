// influencer.ts

import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../util/database';

// InfluencerAttributes 정의: 모델에서 실제 사용하는 데이터 필드
export interface InfluencerAttributes {
  id: number;
  user_id: number;
  follower: any[]; // JSON 형태로 저장되는 팔로워 정보
  banner_picture?: string;
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
        model: 'User', // User 모델 참조
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    follower: {
      type: DataTypes.JSON,
      defaultValue: [],
      allowNull: false,
    },
    banner_picture: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    modified_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal(
        'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
      ),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'modified_at',
    tableName: 'Influencer',
  }
);
