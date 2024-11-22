import React, { Suspense, useEffect, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { ModalProps } from '../../../hooks/useModal';
import Chat from './FeedModalChatBody';
import { feedGet } from '../../../api/requests/feedApi';
import FeedModalImages from './FeedModalImages';
import { Feed } from '../../../types/FeedType';
import FeedModalChatHeader from './FeedModalChatHeader';

// Main Component
const ChatPage = ({ onClose }: ModalProps) => {
  const pageNum = sessionStorage.getItem('page') ?? '';
  const [feed, setFeed] = useState<Feed | undefined>();
  console.log(feed);

  useEffect(() => {
    if (pageNum === '') return;
    const fetchData = async () => {
      const data = await feedGet(pageNum); // 이미지 데이터 가져오기

      setFeed(data); // 상태 업데이트
    };
    fetchData();
  }, [pageNum]);
  return (
    <Suspense fallback={<>로딩중...</>}>
      <Box
        sx={{
          display: 'flex',
          height: '80vh',
          bgcolor: 'transparent',
          justifyContent: 'center',
        }}
      >
        {/* Left Section (60%) */}
        <Box
          sx={{
            width: '50%',
            borderRight: '1px solid #ddd',
            position: 'relative',
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute', // 절대 위치로 설정
              top: 10,
              left: 10,
              zIndex: 10,
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          {feed && (
            <FeedModalImages images={feed?.images} products={feed.products} />
          )}
        </Box>

        {/* Right Section (40%) */}
        <Box
          sx={{
            width: '40%',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: '#fff',
          }}
        >
          {/* Chat Header */}
          <FeedModalChatHeader />
          {/* Chat Body */}
          <Chat />
        </Box>
      </Box>
    </Suspense>
  );
};

export default ChatPage;
