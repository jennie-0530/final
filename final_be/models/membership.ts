import { DataTypes, Model } from "sequelize";
import { sequelize } from "../util/database";
import { MembershipProduct } from "./membershipProduct";
import { User } from "./user";

export const Membership = sequelize.define(
  "Membership",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: MembershipProduct,
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },

    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active", // 기본값: 'active'
    },
  },
  {
    tableName: "Membership", // 실제 테이블 이름
    timestamps: true,
    createdAt: "created_at", // timestamp 컬럼명 매핑
    updatedAt: "modified_at", // timestamp 컬럼명 매핑
  },
);

Membership.belongsTo(User, { foreignKey: "user_id" });
Membership.belongsTo(MembershipProduct, { foreignKey: "product_id" });
