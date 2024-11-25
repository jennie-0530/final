import express from "express";

import { getMembershipProducts } from "../controllers/membershipController";
import { subscribeMembership } from "../controllers/membershipController";

const router = express.Router();
// 특정 인플루언서의 멤버십 상품 가져오기

router.get("/products/:influencerId", getMembershipProducts);
router.post("/subscribe", subscribeMembership);

export { router };
