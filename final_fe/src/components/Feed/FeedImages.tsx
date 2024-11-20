import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Grid } from '@mui/material';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import 'swiper/css';

type FeedImagesProps = {
  feedImages: File[];
  onAddImage: (file: File) => void;
  onRemoveImage: (index: number) => void;
};

const FeedImages: React.FC<FeedImagesProps> = ({
  feedImages,
  onAddImage,
  onRemoveImage,
}) => {
  return (
    <>
      <Swiper
        spaceBetween={10}
        slidesPerView={3.3}
        grabCursor={true}
        loop={false}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {feedImages.map((file, index) => (
          <SwiperSlide key={index}>
            <Grid
              container
              sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}
            >
              <Grid
                item
                xs={12}
                sx={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <CloseIcon
                  color='error'
                  sx={{
                    position: 'absolute',
                    backgroundColor: '#ffffff',
                    width: '15px',
                    height: '15px',
                    borderRadius: '10px',
                    '&:hover': { backgroundColor: '#dcdcdc' },
                  }}
                  onClick={() => onRemoveImage(index)}
                />
                <img
                  src={URL.createObjectURL(file)}
                  alt={`preview-${index}`}
                  style={{ width: '100%', height: 'auto', borderRadius: 4 }}
                />
              </Grid>
            </Grid>
          </SwiperSlide>
        ))}
      </Swiper>

      <Button
        variant='outlined'
        component='label'
        fullWidth
        startIcon={<AddSharpIcon />}
        sx={{ mb: 2 }}
      >
        이미지 추가
        <input
          hidden
          type='file'
          accept='image/*'
          onChange={(e) => e.target.files && onAddImage(e.target.files[0])}
        />
      </Button>
    </>
  );
};

export default FeedImages;
