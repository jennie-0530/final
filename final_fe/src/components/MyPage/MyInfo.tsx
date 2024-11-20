import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Paper, Box, Avatar, Grid, Card, CardContent, TextField, Button } from '@mui/material';

const MyInfo: React.FC = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [userId, setUserId] = useState<string>('1'); // 기본 사용자 ID를 1로 설정
  const [error, setError] = useState<string | null>(null);

  const fetchUserInfo = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:4000/user/${id}`);
      setUserInfo(response.data);
      setError(null); // 에러 메시지 초기화
    } catch (error) {
      console.error('Error fetching user info:', error);
      setUserInfo(null);
      setError('User not found');
    }
  };

  useEffect(() => {
    fetchUserInfo(userId);
  }, [userId]);

  const handleSearch = () => {
    fetchUserInfo(userId);
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
          ) : userInfo ? (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>Nickname:</strong> {userInfo.username}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>About Me:</strong> {userInfo.about_me}</Typography>
              </Grid>
              {userInfo.influencer ? (
                <>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1"><strong>Follower:</strong> {userInfo.influencer.follower}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1"><strong>Banner Picture:</strong></Typography>
                    <Avatar
                      variant="rounded"
                      src={userInfo.influencer.banner_picture}
                      alt="Banner"
                      sx={{ width: '100%', height: 'auto', borderRadius: 2, marginTop: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1" color="primary"><strong>Influencer</strong></Typography>
                  </Grid>
                </>
              ):(<Grid item xs={12}>
                <Typography variant="body1" color="primary"><strong>No Influencer</strong></Typography>
              </Grid>)}
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