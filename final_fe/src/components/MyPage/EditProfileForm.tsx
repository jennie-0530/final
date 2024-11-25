import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Box, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { User } from "../../store/userStore";
import { fetchUserModify } from "../../util/myPageApi";

interface EditProfileFormProps {
  user: User | null;
  setUser: (user: User | null) => void;
  setIsEditing: (isEditing: boolean) => void;
  refreshUserData: () => void; // 데이터 새로고침 함수
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  user,
  setUser,
  setIsEditing,
  refreshUserData,
}) => {
  const [username, setUsername] = useState(user?.username || "");
  const [aboutMe, setAboutMe] = useState(user?.about_me || "");
  const [bannerPicture, setBannerPicture] = useState(user?.influencer?.banner_picture || "");
  const [profilePicture, setProfilePicture] = useState(user?.profile_picture || "");
  const [category, setCategory] = useState(user?.influencer?.category || "여행"); // 기본값 "여행"
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Received user data:", user);
    console.log("Initial Category:", user?.influencer?.category); // 초기값 디버깅
  }, [user]);

  const handleSubmit = async () => {
    if (!user?.id) return;

    setIsLoading(true);
    try {
      // 수정할 데이터 객체
      const updatedData = {
        username,
        about_me: aboutMe,
        profile_picture: profilePicture,
        influencer: user.influencer
          ? {
              ...user.influencer, // 기존 인플루언서 데이터를 유지
              banner_picture: bannerPicture,
              category, // 새 카테고리 업데이트
            }
          : undefined,
      };

      console.log("Updated Data to Submit:", updatedData); // API 요청 디버깅
      await fetchUserModify(String(user.id), updatedData);

      // 최신 데이터를 다시 가져오기
      await refreshUserData();

      setIsEditing(false); // 수정 모드 종료
    } catch (error) {
      console.error("회원정보 수정 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* 닉네임 필드 */}
        <TextField
          label="닉네임"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {/* 소개 필드 */}
        <TextField
          label="소개"
          variant="outlined"
          multiline
          rows={4}
          value={aboutMe}
          onChange={(e) => setAboutMe(e.target.value)}
        />

        {/* 배너 이미지 및 카테고리 선택 - 인플루언서인 경우에만 표시 */}
        {user?.influencer?.banner_picture && (
          <>
            <TextField
              label="배너 이미지 URL"
              variant="outlined"
              value={bannerPicture}
              onChange={(e) => setBannerPicture(e.target.value)}
            />

            {/* 카테고리 선택 */}
            <FormControl fullWidth>
              <InputLabel id="category-select-label">카테고리</InputLabel>
              <Select
                labelId="category-select-label"
                value={category}
                onChange={(e) => {
                  console.log("Selected Category:", e.target.value); // 선택값 디버깅
                  setCategory(e.target.value);
                }}
              >
                <MenuItem value="여행">여행</MenuItem>
                <MenuItem value="패션">패션</MenuItem>
                <MenuItem value="음식">음식</MenuItem>
                <MenuItem value="뷰티">뷰티</MenuItem>
                <MenuItem value="음악">음악</MenuItem>
              </Select>
            </FormControl>
          </>
        )}

        {/* 프로필 이미지 URL 필드 */}
        <TextField
          label="프로필 이미지 URL"
          variant="outlined"
          value={profilePicture}
          onChange={(e) => setProfilePicture(e.target.value)}
        />

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? "저장 중..." : "저장"}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setIsEditing(false)}
            disabled={isLoading}
          >
            취소
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EditProfileForm;
