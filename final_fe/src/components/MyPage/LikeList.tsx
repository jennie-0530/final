import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
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
      <Card>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            User Likes
          </Typography>
          {likes.length > 0 ? (
            <Grid container spacing={3}>
              {likes.map((like, index) => {
                const firstImage = imageParse(like.images);

                return (
                  <Grid item xs={12} key={index}>
                    <Typography variant="body1">
                      <strong>Feed ID:</strong> {like.id}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Content:</strong> {like.content}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Likes:</strong> {JSON.parse(like.likes).length}
                    </Typography>
                    {firstImage && (
                      <CardMedia
                        component="img"
                        height="200"
                        image={firstImage} // 첫 번째 이미지 URL
                        alt="Feed Image"
                        sx={{ marginTop: 2, borderRadius: 2 }}
                      />
                    )}
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <Typography variant="body1">No likes found</Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default LikeList;
