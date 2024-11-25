import React from "react";
import { Box, colors, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { fetchUserFeeds } from "../../util/myPageApi";
import { imageParse } from "../../util/imageParse";
import { useFetchData } from "../../hooks/useFetchData";
import { ImageGrid } from "../common/ImageGrid";
import BrightIcon from "../common/BrightIcon";

const FeedList: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data: feeds, error } = useFetchData(fetchUserFeeds, userId);

  if (error) {
    return <Typography variant="body1">Error loading feeds</Typography>;
  }

  const items = feeds.map((feed) => ({
    id: feed.id,
    imageUrl: imageParse(feed.images),
    overlayContent: (
      <>
        <Box sx={{ fontSize: "1.25rem", fontWeight: "bold", padding: 1, borderRadius: 1 }}>
          <BrightIcon />
          <Typography align="center" variant="h4">{JSON.parse(feed.likes).length}</Typography>
        </Box>
        <Typography>{feed.content}</Typography>
      </>
    ),
  }));

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <ImageGrid items={items} />
    </Container>
  );
};

export default FeedList;
