import { DataTypes } from 'sequelize';
import { sequelize } from '../util/database';
import { User } from './user'; // User 모델 가져오기

export const Influencer = sequelize.define(
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
    timestamps: false, // createdAt과 updatedAt 자동 생성 비활성화
    tableName: 'Influencer', // 테이블 이름 명시
  }
);

// User와의 관계 설정 (1:1 관계)
User.hasOne(Influencer, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Influencer.belongsTo(User, { foreignKey: 'user_id' });
