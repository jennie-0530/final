import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";

interface MembershipProduct {
  id: number;
  name: string;
  price: number;
  benefits: string;
}

const MembershipTab: React.FC<{ influencerId: number; userId: number }> = ({
  influencerId,
  userId,
}) => {
  const [products, setProducts] = useState<MembershipProduct[]>([]);

  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  // 백엔드에서 데이터를 가져오는 로직
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/membership/products/${influencerId}`,
        );
        setProducts(response.data); // 가져온 데이터를 상태에 저장
        console.log("Fetched products:", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [influencerId]);

  const handleSubscribe = async () => {
    if (selectedProduct === null) {
      alert("구독 옵션을 선택하세요!");
      return;
    }

    try {
      console.log({ user_id: userId, product_id: selectedProduct });
      const response = await axios.post(
        "http://localhost:4000/membership/subscribe",
        {
          user_id: userId,
          product_id: selectedProduct,
        },
      );
      if (response.data.success) {
        const subscribedProduct = products.find(
          (p) => p.id === selectedProduct,
        );
        alert(`"${subscribedProduct?.name}" 구독이 완료되었습니다!`);
      } else {
        alert(response.data.message || "구독 신청에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      alert("구독 중 오류가 발생했습니다.");
    }
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              sx={{
                padding: 2,
                border:
                  selectedProduct === product.id ? "2px solid #9C27B0" : "none",
                cursor: "pointer",
              }}
              onClick={() => setSelectedProduct(product.id)}
            >
              <CardContent>
                <Typography variant="h5">{product.name}</Typography>
                <Typography variant="h6">
                  {product.price.toLocaleString()}원
                </Typography>
                <Typography variant="body2">{product.benefits}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ textAlign: "center", marginTop: 3 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubscribe}
          disabled={selectedProduct === null}
        >
          구독하기
        </Button>
      </Box>
    </Box>
  );
};

export default MembershipTab;
