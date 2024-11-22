import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import { fetchUserLikes } from "../../util/myPageApi";
import { useParams } from "react-router-dom";
import { imageParse } from "../../util/imageParse";

const LikeList: React.FC = () => {
  const [likes, setLikes] = useState<any[]>([]);
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    let isCurrent = true;

    const fetchLikes = async () => {
      try {
        const userLikes = await fetchUserLikes(userId!);
        if (isCurrent) {
          setLikes(userLikes);
        }
      } catch (error) {
        if (isCurrent) {
          console.error("Error fetching likes:", error);
          setLikes([]);
        }
      }
    };

    if (userId) {
      fetchLikes();
    }

    return () => {
      isCurrent = false;
    };
  }, [userId]);

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        User Likes
      </Typography>
      {likes.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
            marginTop: 2,
          }}
        >
          {likes.map((like, index) => {
            const firstImage = imageParse(like.images);

            return (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  width: "100%",
                  paddingBottom: "100%", // 정사각형 비율 유지
                  overflow: "hidden",
                  borderRadius: 2,
                  "&:hover img": {
                    filter: "brightness(0.7)", // 호버 시 이미지 어두워짐
                  },
                  "&:hover .overlay": {
                    opacity: 1, // 호버 시 오버레이 표시
                  },
                }}
              >
                {firstImage && (
                  <Box
                    component="img"
                    src={firstImage}
                    alt="Feed Image"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "filter 0.3s ease", // 부드러운 전환 효과
                      filter: "brightness(1)", // 기본 밝기
                    }}
                  />
                )}
                <Box
                  className="overlay"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // 반투명 검정 배경
                    color: "white",
                    display: "flex",
                    flexDirection: "column", // 아이콘과 텍스트 수직 정렬
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0, // 초기에는 투명
                    transition: "opacity 0.3s ease", // 부드러운 전환 효과
                  }}
                >
                  {/* 하트 아이콘 */}
                  <Box
                    component="img"
                    src="https://firebasestorage.googleapis.com/v0/b/hoya-01-6b5ad.appspot.com/o/brightIcon2.png?alt=media&token=752eeb2c-142b-478f-98d5-f233ad60700e"
                    alt="Heart Icon"
                    sx={{
                      width: "40px", // 적절한 크기 설정
                      height: "40px",
                      marginBottom: "8px", // 텍스트와 간격 추가
                    }}
                  />
                  {/* 좋아요 개수 */}
                  <Box sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                    {JSON.parse(like.likes).length}
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      ) : (
        <Typography variant="body1">No likes found</Typography>
      )}
    </Container>
  );
};

export default LikeList;
