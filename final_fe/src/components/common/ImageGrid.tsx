import { Box } from "@mui/material";
import { ImageCard } from "./ImageCard";

interface ImageGridProps {
  items: { id: string; imageUrl: string; overlayContent: JSX.Element }[];
}

export const ImageGrid: React.FC<ImageGridProps> = ({ items }) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 2,
      marginTop: 2,
    }}
  >
    {items.map((item) => (
      <ImageCard key={item.id} imageUrl={item.imageUrl} overlayContent={item.overlayContent} />
    ))}
  </Box>
);
