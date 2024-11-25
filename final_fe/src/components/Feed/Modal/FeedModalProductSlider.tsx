import React from 'react';
import { Box, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { ProductsProps } from '../../../types/FeedType';

const ProductSlider = ({ products }: { products: ProductsProps[] }) => {
  // const products = [1, 2, 3]; // 샘플 데이터

  return (
    <Box
      sx={{
        width: '100%',
        position: 'absolute',
        bottom: '10px',
      }}
    >
      <Swiper
        spaceBetween={10} // 슬라이드 간격
        slidesPerView={2.4} // 슬라이드 수가 적다면 더 작은 값 사용
        slidesPerGroup={1}
        style={{
          width: '100%',
          // height: '230px', // Swiper의 높이 명시적으로 설정
        }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 10 },
          768: { slidesPerView: 2, spaceBetween: 10 },
        }}
      >
        {products.map((item, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                border: '1px solid #ddd',
                borderRadius: 2,
                bgcolor: '#fff',
                p: 1,
                width: '80%', // 슬라이드 크기 조정
                height: '100%',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '0 auto', // 슬라이드 가운데 정렬
              }}
            >
              <img
                src={item.img}
                alt={`Product ${index + 1}`}
                style={{
                  width: '80%',
                  height: '200px',
                  objectFit: 'cover',
                }}
              />
              <Typography variant='body2' sx={{ mt: 1 }}>
                {item.title}
              </Typography>
              <p onClick={() => window.open(item.link)}>
                <Typography
                  variant='body2'
                  sx={{ mt: 1, color: 'blue', cursor: 'pointer' }}
                >
                  보러가기
                </Typography>
              </p>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ProductSlider;
