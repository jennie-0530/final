import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Grid, Card, CardContent, TextField, Button, Avatar } from '@mui/material'; // Avatar 임포트 추가
import { User } from '../../store/userStore'; // User 타입을 가져옵니다
import LikeList from './FavoriteList';

interface MyInfoProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

const MyInfo: React.FC<MyInfoProps> = ({ user, setUser }) => {
  const [userId, setUserId] = useState<string>('1'); // 기본 사용자 ID를 1로 설정
  const [error, setError] = useState<string | null>(null);
  const [likes, setLikes] = useState<any[]>([]); // 좋아요한 피드 데이터를 저장할 상태 추가

  const fetchUserInfo = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:4000/user/${id}`);
      setUser(response.data);
      setError(null); // 에러 메시지 초기화
    } catch (error) {
      console.error('Error fetching user info:', error);
      setUser(null);
      setError('User not found');
    }
  };

  const fetchLikes = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:4000/user/${id}/likes`);
      setLikes(response.data);
      setError(null); // 에러 메시지 초기화
    } catch (error) {
      console.error('Error fetching likes:', error);
      setLikes([]);
      setError('No likes found');
    }
  };

  useEffect(() => {
    fetchUserInfo(userId);
    fetchLikes(userId);
  }, [userId]);

  const handleSearch = () => {
    fetchUserInfo(userId);
    fetchLikes(userId);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            User Profile
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
            <TextField
              label="User ID"
              variant="outlined"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Search
            </Button>
          </Box>
          {error ? (
            <Typography variant="body1" color="error">{error}</Typography>
          ) : user ? (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>Nickname:</strong> {user.username}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>About Me:</strong> {user.about_me}</Typography>
              </Grid>
              {user.influencer ? (
                <>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1"><strong>Follower:</strong> {JSON.parse(user.influencer.follower).length}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1"><strong>Banner Picture:</strong></Typography>
                    <Avatar
                      variant="rounded"
                      src={user.influencer.banner_picture}
                      alt="Banner"
                      sx={{ width: '100%', height: 'auto', borderRadius: 2, marginTop: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1" color="primary"><strong>Influencer</strong></Typography>
                  </Grid>
                </>
              ) : (
                <Grid item xs={12}>
                  <Typography variant="body1" color="primary"><strong>No Influencer</strong></Typography>
                </Grid>
              )}
            </Grid>
          ) : (
            <Typography variant="body1">No user found</Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default MyInfo;