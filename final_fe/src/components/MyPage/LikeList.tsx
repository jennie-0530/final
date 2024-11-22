import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { fetchUserLikes } from "../../util/myPageApi";
import { imageParse } from "../../util/imageParse";
import { useFetchData } from "../../hooks/useFetchData";
import { ImageGrid } from "../common/ImageGrid";
import BrightIcon from "../common/BrightIcon";

const LikeList: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data: likes, error } = useFetchData(fetchUserLikes, userId);

  if (error) {
    return <Typography variant="body1">Error loading likes</Typography>;
  }

  const items = likes.map((like) => ({
    id: like.id,
    imageUrl: imageParse(like.images),
    overlayContent: (
      <>
        <Box sx={{ fontSize: "1.25rem", fontWeight: "bold", padding: 1, borderRadius: 1 }}>
          <BrightIcon />
          <Typography align="center" variant="h4">{JSON.parse(like.likes).length}</Typography>
        </Box>
        <Typography>{like.content}</Typography>
      </>
    ),
  }));

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      {/* <Typography variant="h4" component="h1" gutterBottom>
        User Likes
      </Typography> */}
      <ImageGrid items={items} />
    </Container>
  );
};

export default LikeList;
