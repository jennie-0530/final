import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Box,
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
        setFollows([]);
      }
    };

    if (userId) {
      fetchFollows();
    }
  }, [userId]);

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            User Follows
          </Typography>
          {Follows.length > 0 ? (
            <Grid container spacing={3}>
              {Follows.map((follow, index) => {
                const profileImage = follow.User.profile_image || ""; // 프로필 이미지 URL
                return (
                  <Grid item xs={12} key={index}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar
                        src={profileImage}
                        alt={follow.User.username}
                        sx={{ width: 64, height: 64 }}
                      />
                      <Box>
                        <Typography variant="body1">
                          <strong>Influencer Name:</strong> {follow.User.username}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Introduce:</strong> {follow.User.about_me}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Followers:</strong> {JSON.parse(follow.follower).length}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <Typography variant="body1">No follows found</Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default FollowList;
