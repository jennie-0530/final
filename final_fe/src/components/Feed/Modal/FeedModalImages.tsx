import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Scrollbar, Navigation } from 'swiper/modules';
import 'swiper/css';
// import 'swiper/css/navigation';
import ProductSlider from './FeedModalProductSlider';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ProductsProps } from '../../../types/FeedType';

const FeedModalImages = ({
  images,
  products,
}: {
  images: string[];
  products: ProductsProps[];
}) => {
  const [isShowProduct, setIsShowProduct] = useState(false);

  const onShowProduct = () => {
    setIsShowProduct((prev) => !prev);
  };

  return (
    <Box sx={{ position: 'relative', p: 0 }}>
      {/* Swiper */}
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[Pagination, Scrollbar, Navigation]}
        loop
        style={{ width: '100%', height: '685px' }}
      >
        {images.map((src, index) => (
          <SwiperSlide
            key={index}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Box
              sx={{
                borderRadius: 2,
                width: '100%',
                margin: '0 auto',
                textAlign: 'center',
              }}
            >
              <img
                src={src}
                alt={`Slide ${index}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 2,
                }}
                onClick={() => setIsShowProduct(false)} // 제품 보기 닫기
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 커스텀 내비게이션 버튼 */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          zIndex: 10,
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
        }}
        className='swiper-button-prev'
      >
        <ArrowBackIosIcon
          sx={{
            color: '#fff',
            fontSize: '14px',
            position: 'relative',
            left: '3px',
          }}
        />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          zIndex: 10,
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
        }}
        className='swiper-button-next'
      >
        <ArrowForwardIosIcon
          sx={{
            color: '#fff',
            fontSize: '14px',
            position: 'relative',
            left: '1px',
          }}
        />
      </Box>

      {/* 쇼핑 카트 버튼 */}
      {!isShowProduct && products.length > 0 && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            backgroundColor: 'rgba(0, 0, 0, 0.6)', // 반투명 배경
            color: '#fff', // 아이콘 색상
            borderRadius: '50%', // 동그란 버튼
            width: '50px',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            zIndex: 10,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.8)', // hover 효과
            },
          }}
          onClick={onShowProduct}
        >
          <ShoppingCartIcon sx={{ fontSize: '30px' }} />
        </Box>
      )}

      {/* 닫기 버튼 */}
      {isShowProduct && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            backgroundColor: 'rgba(255, 0, 0, 0.6)', // 닫기 버튼 배경
            color: '#fff',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            zIndex: 10,
            '&:hover': {
              backgroundColor: 'rgba(255, 0, 0, 0.8)',
            },
          }}
          onClick={onShowProduct}
        >
          <CloseIcon sx={{ fontSize: '30px' }} />
        </Box>
      )}

      {/* Product Slider */}
      {isShowProduct && <ProductSlider products={products} />}
    </Box>
  );
};

export default FeedModalImages;
