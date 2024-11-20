import React from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { User } from '../../store/userStore'; // User 타입을 가져옵니다

interface LikeListProps {
  user: User | null;
  setUser: (user: User | null) => void;
  likes: any[]; // 좋아요한 피드 데이터를 전달받음
}

const LikeList: React.FC<LikeListProps> = ({ user, setUser, likes }) => {
  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            User Likes
          </Typography>
          {likes.length > 0 ? (
            <Grid container spacing={3}>
              {likes.map((like, index) => (
                <Grid item xs={12} key={index}>
                  <Typography variant="body1"><strong>Feed ID:</strong> {like.id}</Typography>
                  <Typography variant="body1"><strong>Title:</strong> {like.content}</Typography>
                  <Typography variant="body1"><strong>Description:</strong> {like.description}</Typography>
                  <Typography variant="body1"><strong>Likes:</strong> {JSON.parse(like.likes).length}</Typography> {/* likes 값을 출력 */}
                </Grid>
              ))}
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