import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Avatar,
  Box,
  Typography,
  Chip,
} from "@mui/material";
import { fetchUserFollowings } from "../../util/myPageApi";
import { useParams } from "react-router-dom";

const FollowList: React.FC = () => {
  const [Follows, setFollows] = useState<any[]>([]);
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    const fetchFollows = async () => {
      try {
        const userFollows = await fetchUserFollowings(userId!);
        setFollows(userFollows);
      } catch (error) {
        console.error("Error fetching follows:", error);
        setFollows([]); // 에러 발생 시 빈 배열로 초기화
      }
    };

    if (userId) {
      fetchFollows();
    }
  }, [userId]);

  // 팔로우한 인플루언서가 없는 경우
  if (Follows.length === 0) {
    return (
      <Container maxWidth="md" sx={{ marginTop: 4, textAlign: "center" }}>
        <Typography variant="h6" color="textSecondary">
          팔로우한 인플루언서가 없습니다.
        </Typography>
      </Container>
    );
  }

  // 팔로우한 인플루언서가 있는 경우
  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        {Follows.map((follow, index) => {
          const profileImage = follow.User.profile_image || ""; // 프로필 이미지 URL
          return (
            <Grid item xs={12} key={index}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: 2,
                  border: "1px solid #e0e0e0",
                  borderRadius: "12px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Avatar
                  src={profileImage}
                  alt={follow.User.username}
                  sx={{ width: 56, height: 56 }}
                />
                <Box sx={{ marginLeft: 2, flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {follow.User.username}
                  </Typography>
                  <Chip
                    label={follow.category}
                    color="primary"
                    size="small"
                    sx={{
                      marginTop: 0.5,
                      backgroundColor:
                        follow.category === "여행"
                          ? "#a3e4d7"
                          : follow.category === "패션"
                          ? "#d2b4de"
                          : "#f5b7b1",
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default FollowList;
