import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Avatar,
  IconButton,
} from '@mui/material';
import { AddPhotoAlternate } from '@mui/icons-material';
import axios from 'axios';

const ProductForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [grade, setGrade] = useState('');
  const [thumbnails, setThumbnails] = useState<File[]>([]); // 썸네일 파일 상태
  const [productImgs, setProductImgs] = useState<File[]>([]); // 제품 이미지 파일 상태
  const [productImgLinks, setProductImgLinks] = useState<string[]>([]); // 제품 이미지 링크 상태
  const [productImgTitles, setProductTitles] = useState<string[]>([]); // 제품 이미지 링크 상태
  const [thumbnailPreviews, setThumbnailPreviews] = useState<string[]>([]); // 썸네일 미리보기 상태
  const [productImgPreviews, setProductImgPreviews] = useState<string[]>([]); // 제품 이미지 미리보기 상태

  // 썸네일 파일 변경 처리 함수
  const handleThumbnailChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.files) {
      const newThumbnails = [...thumbnails];
      newThumbnails[index] = e.target.files[0]; // 해당 인덱스의 파일 업데이트
      setThumbnails(newThumbnails);

      const newPreviews = [...thumbnailPreviews];
      newPreviews[index] = URL.createObjectURL(e.target.files[0]); // 해당 인덱스의 미리보기 업데이트
      setThumbnailPreviews(newPreviews);
    }
  };

  // 제품 이미지 파일 변경 처리 함수
  const handleProductImgChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.files) {
      const newProductImgs = [...productImgs];
      newProductImgs[index] = e.target.files[0]; // 해당 인덱스의 파일 업데이트
      setProductImgs(newProductImgs);

      const newPreviews = [...productImgPreviews];
      newPreviews[index] = URL.createObjectURL(e.target.files[0]); // 해당 인덱스의 미리보기 업데이트
      setProductImgPreviews(newPreviews);
    }
  };

  // 링크 변경 처리 함수
  const handleProductImgLinkChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newLinks = [...productImgLinks];
    newLinks[index] = e.target.value; // 해당 인덱스의 링크 업데이트
    setProductImgLinks(newLinks);
  };
  // 프로덕트 타이틀 변경 처리 함수
  const handleProductImgTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newTitles = [...productImgTitles];
    newTitles[index] = e.target.value; // 해당 인덱스의 링크 업데이트
    setProductTitles(newTitles);
  };
  // 썸네일과 제품 이미지 추가하기 버튼 처리
  const addThumbnail = () => setThumbnails([...thumbnails, null as any]);
  const addProductImg = () => {
    setProductImgs([...productImgs, null as any]);
    setProductImgLinks([...productImgLinks, '']); // 새로운 이미지에 대해 링크도 추가
    setProductTitles([...productImgTitles, '']); // 새로운 타이틀에 대해 타이틀도 추가
  };

  // 폼 제출 처리 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('grade', grade);

    // 썸네일 파일 추가
    thumbnails.forEach((file) => {
      if (file) formData.append('thumbnail', file);
    });

    // 제품 이미지 파일과 링크 추가
    productImgs.forEach((file, index) => {
      if (file) formData.append('productImg', file);
      if (productImgLinks[index])
        formData.append('productImgLink', productImgLinks[index]);
      if (productImgTitles[index])
        formData.append('productImgTitle', productImgTitles[index]);
    });

    console.log(
      title,
      description,
      grade,
      thumbnails,
      productImgs,
      productImgLinks,
      productImgTitles
    );

    try {
      const response = await axios.post(
        'http://localhost:4000/feed',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      alert(response);
    } catch (error) {
      console.error('Error uploading product', error);
      alert('Failed to upload product');
    }
  };

  return (
    <Box sx={{ width: '50%', margin: '0 auto', padding: 3 }}>
      <Typography variant='h5' gutterBottom>
        Product Registration
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Title */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Title'
              variant='outlined'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Description'
              variant='outlined'
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>

          {/* Grade */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Grade'
              variant='outlined'
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            />
          </Grid>

          {/* Thumbnail */}
          <Grid item xs={12}>
            <Typography variant='h6'>Thumbnail Images</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {thumbnails.map((file, index) => (
                <Box
                  key={index}
                  sx={{
                    border: '1px dashed grey',
                    padding: 2,
                    position: 'relative',
                  }}
                >
                  <input
                    type='file'
                    accept='image/*'
                    onChange={(e) => handleThumbnailChange(e, index)}
                    style={{ display: 'none' }} // 파일 입력 필드를 숨깁니다.
                    id={`thumbnail-upload-${index}`}
                  />
                  <label htmlFor={`thumbnail-upload-${index}`}>
                    <IconButton
                      component='span'
                      sx={{
                        fontSize: '3rem',
                        color: 'grey',
                        backgroundColor: 'lightgrey',
                        padding: 1,
                        borderRadius: '50%',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <AddPhotoAlternate />
                    </IconButton>
                    <Typography variant='body1'>
                      Upload Thumbnail {index + 1}
                    </Typography>
                  </label>
                  {/* 미리보기 */}
                  {thumbnailPreviews[index] && (
                    <Avatar
                      src={thumbnailPreviews[index]}
                      sx={{ width: 56, height: 56, marginTop: 2 }}
                    />
                  )}
                </Box>
              ))}
              <Button
                onClick={addThumbnail}
                variant='outlined'
                sx={{ width: '100%' }}
              >
                Add Another Thumbnail
              </Button>
            </Box>
          </Grid>

          {/* Product Images */}
          <Grid item xs={12}>
            <Typography variant='h6'>Product Images</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {productImgs.map((file, index) => (
                <Box
                  key={index}
                  sx={{ display: 'flex', gap: 2, alignItems: 'center' }}
                >
                  <Box
                    sx={{
                      border: '1px dashed grey',
                      padding: 2,
                      position: 'relative',
                      flex: 1,
                    }}
                  >
                    <input
                      type='file'
                      accept='image/*'
                      onChange={(e) => handleProductImgChange(e, index)}
                      style={{ display: 'none' }} // 파일 입력 필드를 숨깁니다.
                      id={`product-img-upload-${index}`}
                    />
                    <label htmlFor={`product-img-upload-${index}`}>
                      <IconButton
                        component='span'
                        sx={{
                          fontSize: '3rem',
                          color: 'grey',
                          backgroundColor: 'lightgrey',
                          padding: 1,
                          borderRadius: '50%',
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        <AddPhotoAlternate />
                      </IconButton>
                      <Typography variant='body1'>
                        Upload Product Image {index + 1}
                      </Typography>
                    </label>
                    {/* 미리보기 */}
                    {productImgPreviews[index] && (
                      <Avatar
                        src={productImgPreviews[index]}
                        sx={{ width: 56, height: 56, marginTop: 2 }}
                      />
                    )}
                  </Box>
                  <TextField
                    label='Image Link'
                    variant='outlined'
                    fullWidth
                    value={productImgLinks[index]}
                    onChange={(e: any) => handleProductImgLinkChange(e, index)}
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label='Image Title'
                    variant='outlined'
                    fullWidth
                    value={productImgTitles[index]}
                    onChange={(e: any) => handleProductImgTitleChange(e, index)}
                    sx={{ flex: 1 }}
                  />
                </Box>
              ))}
              <Button
                onClick={addProductImg}
                variant='outlined'
                sx={{ width: '100%' }}
              >
                Add Another Product Image
              </Button>
            </Box>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type='submit' variant='contained' color='primary' fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ProductForm;
