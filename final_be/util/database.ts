import { Sequelize } from 'sequelize';
// Sequelize 인스턴스 생성
export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_ID as string,
  process.env.DB_PW as string,
  {
    host: process.env.DB_HOST as string,
    dialect: 'mysql',
    port: 3306,
    pool: {
      max: 10, // 최대 연결 수
      min: 0, // 최소 연결 수
      acquire: 30000, // 연결이 유효한지 확인하는 최대 시간 (ms)
      idle: 10000, // 유휴 연결이 끊어지기 전 대기 시간 (ms)
    },
    dialectOptions: {
      // 필요한 경우 MySQL 옵션 추가
    },
  }
);

module.exports = sequelize;
