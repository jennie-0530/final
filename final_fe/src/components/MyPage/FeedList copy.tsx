import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { fetchUserFeeds } from "../../util/myPageApi";
import { useParams } from "react-router-dom";
import { imageParse } from "../../util/imageParse";

const FeedList: React.FC = () => {
  const [feeds, setFeeds] = useState<any[]>([]);
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const userFeeds = await fetchUserFeeds(userId!);
        setFeeds(userFeeds);
      } catch (error) {
        console.error("Error fetching feeds:", error);
        setFeeds([]);
      }
    };

    if (userId) {
      fetchFeeds();
    }
  }, [userId]);

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            User Feeds
          </Typography>
          {feeds.length > 0 ? (
            <Grid container spacing={3}>
              {feeds.map((feed, index) => {
                const firstImage = imageParse(feed.images);

                return (
                  <Grid item xs={12} key={index}>
                    <Typography variant="body1">
                      <strong>Feed ID:</strong> {feed.id}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Content:</strong> {feed.content}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Likes:</strong> {JSON.parse(feed.likes).length}
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
            <Typography variant="body1">No feeds found</Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default FeedList;
