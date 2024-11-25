// models/membershipProduct.ts

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../util/database";
import { Influencer } from "./influencer";
import { Membership } from "./membership";
export class MembershipProduct extends Model {}

MembershipProduct.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    influencer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    level: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    benefits: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    modified_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize, // Sequelize 인스턴스 연결
    modelName: "MembershipProduct", // Sequelize가 사용하는 모델 이름
    tableName: "Membership_Product", // 실제 데이터베이스 테이블 이름
    timestamps: false, // created_at 및 modified_at을 수동으로 관리하므로 timestamps 사용 안 함
  },
);
MembershipProduct.belongsTo(Influencer, { foreignKey: "influencer_id" });
