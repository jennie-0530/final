import { Box, Typography, Button } from '@mui/material';
import React from 'react';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
const FeedModalChatHeader = () => {
  return (
    <Box
      sx={{
        borderBottom: '1px solid #ddd',
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        bgcolor: '#fff',
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
          인플 김현진
        </Typography>
        <Button
          sx={{
            fontWeight: 'bold', // 텍스트 굵기 변경 (선택사항)
          }}
        >
          <AutoAwesomeIcon sx={{ marginRight: '5px', color: '#9252E7' }} />
          <span style={{ color: '#9252E7' }}> 팔로우</span>
        </Button>
      </Box>
      <Box>
        <Button
          variant='outlined'
          size='small'
          sx={{ mr: 1, border: '#9252E7 1px solid', color: '#9252E7' }}
        >
          피드 삭제
        </Button>
        <Button
          variant='contained'
          size='small'
          sx={{ backgroundColor: '#9252E7' }}
        >
          피드 수정
        </Button>
      </Box>
    </Box>
  );
};

export default FeedModalChatHeader;
