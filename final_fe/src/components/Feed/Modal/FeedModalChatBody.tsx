import React from 'react';
import { Box, IconButton, Typography, TextField, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendIcon from '@mui/icons-material/Send';

// Chat Component
const Chat: React.FC = () => {
  const messages = [
    {
      id: 1,
      sender: '인플 김현진',
      text: '강아지 좋아합니다.',
    },
    {
      id: 2,
      sender: '익명의 팬',
      text: '현진씨 팬이에요',
    },
  ];

  return (
    <Box
      sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant='subtitle2'
            sx={{
              fontWeight: 'bold',
              color: '#555',
              padding: '20px 5px 30px 5px',
              borderBottom: '1px solid #ddd',
            }}
          >
            안녕하세요. 잘안취하고 자취하는 남자 김현진입니다 ^^
          </Typography>
        </Box>
        <Typography
          sx={{
            fontWeight: 'bold',
            color: '#555',
            padding: '0px 5px',
          }}
        >
          댓글
        </Typography>
        {messages.map((message) => (
          <React.Fragment key={message.id}>
            <Box sx={{ padding: '0px 5px' }}>
              <Box sx={{ display: 'flex', mb: '5px' }}>
                <Typography
                  variant='subtitle2'
                  sx={{
                    fontWeight: 'bold',
                    color: '#555',
                    fontSize: '16px',
                  }}
                >
                  {message.sender}
                </Typography>
                <Button
                  sx={{
                    border: '1px solid #9252E7',
                    fontSize: '14px',
                    margin: '0 5px',
                    padding: '0',
                    minWidth: '40px',
                    borderRadius: '10px',
                    color: '#9252E7',
                    cursor: 'pointer',
                  }}
                >
                  신고
                </Button>
              </Box>
              <Typography variant='body2'>{message.text}</Typography>
            </Box>
          </React.Fragment>
        ))}
      </Box>
      <Box>
        <Box
          sx={{
            display: 'flex',
            borderTop: '1px solid #ddd',
            padding: '5px 0 0 0',
          }}
        >
          <Button
            sx={{
              fontWeight: 'bold', // 텍스트 굵기 변경 (선택사항)
            }}
          >
            <FavoriteBorderIcon
              sx={{ cursor: 'pointer', marginRight: '5px', color: '#000000' }}
            />
            <span style={{ color: '#000000' }}> 좋아요 0 개</span>
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            // borderTop: '1px solid #ddd',
            pt: 1,
          }}
        >
          <TextField
            fullWidth
            placeholder='메시지를 입력하세요'
            size='small'
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none', // 보더 제거
                },
              },
            }}
          />
          <IconButton sx={{ color: '#9252E7' }}>
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
