const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
// 다른 파일에서 sequelize 가져오기
const sequelizeDB = require('./util/database');
// http
const { createServer } = require('node:http');
const port: number = 4000;

// 서버
const app = express();
const server = createServer(app);

// 미들웨어 설정
app.use(morgan('dev'));
app.use(
  cors({
    origin: 'http://localhost:3000', // 클라이언트 주소
    credentials: true, // 쿠키를 포함하여 요청을 보내도록 설정
  })
);

// 요청 본문 크기 제한을 10MB로 설정 (필요에 따라 더 크게 조정 가능)
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
  sequelizeDB
    .authenticate()
    .then(() => {
      console.log('Database connection has been established successfully.');
    })
    .catch((err: any) => {
      console.error('Unable to connect to the database:', err);
    });
});
