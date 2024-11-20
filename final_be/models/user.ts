import { DataTypes } from 'sequelize';
import { sequelize } from '../util/database';

export const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(255), // VARCHAR(255)
      allowNull: true, // 중복 허용
    },
    email: {
      type: DataTypes.STRING(255), // VARCHAR(255)
      allowNull: false,
      unique: true, // UNIQUE 제약조건
    },
    password: {
      type: DataTypes.STRING(255), // VARCHAR(255)
      allowNull: false,
    },
    about_me: {
      type: DataTypes.TEXT, // TEXT 타입
      allowNull: true,
    },
    profile_picture: {
      type: DataTypes.STRING(255), // VARCHAR(255)
      allowNull: true,
    },
    follow: {
      type: DataTypes.JSON, // JSON 타입
      defaultValue: [], // 기본값 빈 배열
      allowNull: false,
    },
  },
  {
    timestamps: true, // Sequelize가 기본적으로 createdAt, updatedAt 관리
    createdAt: 'created_at', // DB에서 이름을 created_at으로 설정
    updatedAt: 'modified_at', // DB에서 이름을 modified_at으로 설정
    tableName: 'User', // 테이블 이름을 User로 설정
  }
);