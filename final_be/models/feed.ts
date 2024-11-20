import { DataTypes } from 'sequelize';
import { sequelize } from '../util/database';

export const Feed = sequelize.define(
  'Feed',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    influencer_id: { type: DataTypes.INTEGER, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: true },
    images: { type: DataTypes.JSONB, allowNull: true },
    products: { type: DataTypes.JSONB, allowNull: true },
    visibility_level: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },
    likes: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true }, // ARRAY로 설정
  },
  {
    timestamps: true, // Sequelize가 기본적으로 createdAt, updatedAt 관리
    createdAt: 'created_at', // DB에서 이름을 created_at으로 설정
    updatedAt: 'modified_at', // DB에서 이름을 modified_at으로 설정
    tableName: 'Feed',
  }
);
