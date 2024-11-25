import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../util/database';

// UserAttributes 정의: 모델에서 실제 사용하는 데이터 필드
export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  about_me?: string;
  profile_picture?: string;
  follow?: string[];
  created_at?: Date;
  modified_at?: Date;
}

// UserCreationAttributes 정의: 유저 생성 시 필요한 필드
type UserCreationAttributes = Optional<
  UserAttributes,
  | 'id'
  | 'about_me'
  | 'profile_picture'
  | 'follow'
  | 'created_at'
  | 'modified_at'
  | 'username'
>;

// User 모델 정의
export const User = sequelize.define<
  Model<UserAttributes, UserCreationAttributes>
>(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    about_me: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    follow: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'modified_at',
    tableName: 'User',
  }
);
