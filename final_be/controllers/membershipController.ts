import { Request, Response } from "express";
import { MembershipProduct } from "../models/membershipProduct";
import { Membership } from "../models/membership";

export const getMembershipProducts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { influencerId } = req.params;

  try {
    // 해당 인플루언서의 모든 멤버십 상품 가져오기
    const products = await MembershipProduct.findAll({
      where: { influencer_id: influencerId },
    });

    if (products.length === 0) {
      res.status(404).json({ error: "No membership products found" });
      return;
    }

    res.status(200).json(products);
  } catch (error: any) {
    console.error("Error fetching membership products:", error.message);
    res.status(500).json({ error: "Failed to fetch membership products" });
  }
};

export const subscribeMembership = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { user_id: userId, product_id: productId } = req.body;

  if (!userId || !productId) {
    res.status(400).json({ success: false, message: "Invalid input" });
    return;
  }
  try {
    // 먼저 product가 존재하는지 확인
    const product = await MembershipProduct.findByPk(productId);
    if (!product) {
      res.status(404).json({
        success: false,
        message: "Membership product not found",
      });
      return;
    }

    // 이미 활성화된 구독이 있는지 확인
    const existingSubscription = await Membership.findOne({
      where: {
        user_id: userId,
        product_id: productId,
        // status: "active",
      },
    });
    if (existingSubscription) {
      res.status(400).json({
        success: false,
        message: "User already has an active subscription for this product",
      });
      return;
    }

    const subscription = await Membership.create({
      user_id: userId,
      product_id: productId,
      start_date: new Date(),
      status: "active",
    });
    res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      data: subscription,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
