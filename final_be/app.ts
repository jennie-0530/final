import express from "express";
import morgan from "morgan";

import cors from "cors";
import { createServer } from "http"; // 'node:http' 대신 'http'로 변경 (CommonJS 환경 호환성)
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { swaggerOptions } from "./swagger/config"; // swaggerConfig 경로는 맞는지 확인
import "./models/index";
// 라우터
import { router as feedRouter } from "./router/feed"; // 'feedRouter'로 이름 수정 (라우터 명시적 이름)
import { router as userRouter } from "./router/user"; // 'userRouter'로 이름 수정 (라우터 명시적 이름)
import { router as membershipProductRoutes } from "./router/membershipProduct";

// 포트 및 앱 설정
const port: number = 4000;
const app = express();
const server = createServer(app);
// 미들웨어 설정
app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], // 클라이언트 주소
    credentials: true, // 쿠키를 포함하여 요청을 보내도록 설정
  }),
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Swagger UI 설정
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// 라우터 설정
app.use("/feed", feedRouter);
app.use("/user", userRouter);
app.use("/membership", membershipProductRoutes);

// 서버 실행
server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
