import { Request, Response } from "express";
import * as membershipProductService from "../services/membershipProductService";

export const getMembershipProducts = async (req: Request, res: Response) => {
  const { influencerId } = req.params;

  try {
    const products = await membershipProductService.getProductsByInfluencerId(
      Number(influencerId),
    );
    if (products.length === 0) {
      return res.status(404).json({ error: "No membership products found" });
    }

    res.status(200).json(products); // 성공적으로 데이터를 반환
  } catch (error: any) {
    console.error("Error fetching membership products:", error.message);
    res.status(500).json({ error: "Failed to fetch membership products" });
  }
};
