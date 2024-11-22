import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Avatar,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
} from "@mui/material";
import { User } from "../../store/userStore";
import { Link, redirect } from "react-router-dom";

interface MyInfoProps {
  user: User | null;
  setUser: (user: User | null) => void;
  setUserId: (id: string) => void; // User ID 변경을 위한 함수
}

const MyInfo: React.FC<MyInfoProps> = ({ user, setUserId }) => {
  const [inputUserId, setInputUserId] = useState<string>(""); // 입력된 User ID 상태

  const handleSearch = () => {
    if (inputUserId.trim()) {
      setUserId(inputUserId);
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      {/* 배너 이미지 */}
      {user?.influencer?.banner_picture && (
        <Box
          sx={{
            width: "100%",
            height: "200px",
            backgroundImage: `url(${user.influencer.banner_picture})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 2,
            marginBottom: 3,
          }}
        />
      )}

      <Card sx={{ padding: 3 }}>
        <CardContent>
          {/* User ID 입력창 */}
          <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
            <TextField
              label="User ID"
              variant="outlined"
              value={inputUserId}
              onChange={(e) => setInputUserId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Search
            </Button>
          </Box>

          <Grid container spacing={3} alignItems="center">
            {/* 프로필 이미지 */}
            <Grid item xs={12} sm={4} sx={{ display: "flex", justifyContent: "center" }}>
              <Box sx={{ textAlign: "center" }}>
                <Avatar
                  src={user?.profile_picture || ""}
                  alt={user?.username || "User"}
                  sx={{ width: 150, height: 150 }}
                />
                {/* 인플루언서가 아닌 경우 메시지 표시 */}
                {!user?.influencer?.id && (
                  <Link to="/">
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{ marginTop: 2 }}
                    >
                    인플루언서 지원하기
                  </Typography>
                    </Link>
                )}
              </Box>
            </Grid>

            {/* 사용자 정보 */}
            <Grid item xs={12} sm={8}>
              <Typography variant="h5" fontWeight="bold">
                {user?.username || "닉네임 없음"}
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
                {user?.about_me || "소개가 없습니다."}
              </Typography>
              {/* 인플루언서인 경우 팔로워 표시 */}
              {user?.influencer?.id && (
                <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                  팔로워:{" "}
                  {user.influencer.follower
                    ? JSON.parse(user.influencer.follower).length
                    : 0}
                </Typography>
              )}

              {/* 버튼 */}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mt: 3,
                }}
              >
                <Button variant="contained" color="primary">
                  프로필 편집
                </Button>
                <Button variant="outlined" color="secondary">
                  로그아웃
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default MyInfo;
