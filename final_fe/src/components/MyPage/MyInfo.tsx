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

interface MyInfoProps {
  user: User | null;
  setUser: (user: User | null) => void;
  setUserId: (id: string) => void;
  setIsEditing: (isEditing: boolean) => void; // 수정 모드 상태 변경 함수
}

const MyInfo: React.FC<MyInfoProps> = ({ user, setUserId, setIsEditing }) => {
  const [inputUserId, setInputUserId] = useState<string>("");

  const handleSearch = () => {
    if (inputUserId.trim()) {
      setUserId(inputUserId);
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      {/* 배너 이미지 */}
      {user && user.influencer?.banner_picture !== null && user.influencer && (
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
            <Grid
              item
              xs={12}
              sm={4}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Avatar
                  src={user?.profile_picture || ""}
                  alt={user?.username || "User"}
                  sx={{ width: 150, height: 150 }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={8}>
              <Typography variant="h5" fontWeight="bold">
                {user?.username || "닉네임 없음"}
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
                {user?.about_me || "소개가 없습니다."}
              </Typography>

              <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setIsEditing(true)} // 수정 모드로 전환
                >
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
