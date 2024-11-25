import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Box,
} from "@mui/material";

const membershipData = [
  {
    id: 1,
    name: "에그머니",
    price: 10000,
    benefits: [
      "독점 컨텐츠 열람 가능",
      "독점 컨텐츠 열람 가능",
      "독점 컨텐츠 열람 가능",
    ],
  },
  {
    id: 2,
    name: "프리미엄",
    price: 20000,
    benefits: [
      "고화질 컨텐츠 열람 가능",
      "1:1 메시지 가능",
      "독점 컨텐츠 열람 가능",
    ],
  },
  {
    id: 3,
    name: "VIP",
    price: 30000,
    benefits: [
      "라이브 세션 참여 가능",
      "독점 컨텐츠 열람 가능",
      "스페셜 이벤트 초대",
    ],
  },
];

const MembershipPlans: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: 2 }}>
      <Grid container spacing={2}>
        {membershipData.map((plan) => (
          <Grid item xs={12} sm={6} md={4} key={plan.id}>
            <Card sx={{ padding: 2, borderRadius: 4, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {plan.name}{" "}
                  <TextField
                    variant="outlined"
                    size="small"
                    defaultValue={plan.price}
                    InputProps={{
                      endAdornment: <Typography>원</Typography>,
                    }}
                  />
                </Typography>
                {plan.benefits.map((benefit, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{ display: "flex", alignItems: "center", marginTop: 1 }}
                  >
                    ✔ {benefit}
                  </Typography>
                ))}
                <Box
                  sx={{
                    marginTop: 2,
                    textAlign: "center",
                    color: "purple",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  + 추가하기
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MembershipPlans;
