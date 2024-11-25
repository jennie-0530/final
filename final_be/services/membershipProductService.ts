import { MembershipProduct } from "../models/membershipProduct";

export const getProductsByInfluencerId = async (influencerId: number) => {
  return await MembershipProduct.findAll({
    where: { influencer_id: influencerId },
  });
};
