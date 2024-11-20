import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import FeedImages from './FeedImages';
import FeedRecommendations from './FeedRecommendations';
import { feedWrite } from '../../api/requests/feedApi';
type Product = {
  img: null;
  link: string;
  title: string;
  [key: string]: any; // 동적 속성 허용
};
const PostForm = () => {
  const [description, setDescription] = useState('');
  const [grade, setGrade] = useState('1');
  const [postImages, setPostImages] = useState<File[]>([]);
  const [productImgs, setProductImgs] = useState([
    { img: null, link: '', title: '' },
  ]);

  const handleAddPostImage = (file: File) =>
    setPostImages([...postImages, file]);
  const handleRemovePostImage = (index: number) =>
    setPostImages(postImages.filter((_, i) => i !== index));

  const handleProductChange = (index: number, field: string, value: any) => {
    const updatedProducts: Product[] = [...productImgs];
    updatedProducts[index][field] = value;
    setProductImgs(updatedProducts);
  };

  const addProduct = () =>
    setProductImgs([...productImgs, { img: null, link: '', title: '' }]);
  const removeProduct = (index: number) =>
    setProductImgs(productImgs.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    postImages.forEach((image) => formData.append('postImages', image));
    productImgs.forEach((product) => {
      if (product.img) formData.append('productImgs', product.img);
      formData.append('productImgsLink', product.link);
      formData.append('productImgsTitle', product.title);
    });
    formData.append('description', description);
    formData.append('grade', grade);

    const res = await feedWrite(formData);
    if (res?.status === 200) return alert(`${res.data.message}`);
  };

  return (
    <Box
      sx={{
        p: 4,
        maxWidth: 400,
        mx: 'auto',
        border: '1px solid #ccc',
        borderRadius: 2,
      }}
    >
      <Typography variant='h6' sx={{ mb: 2, textAlign: 'center' }}>
        게시글 등록하기
      </Typography>

      <FeedImages
        feedImages={postImages}
        onAddImage={handleAddPostImage}
        onRemoveImage={handleRemovePostImage}
      />

      <TextField
        fullWidth
        label='내용'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Select
        fullWidth
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        sx={{ mb: 2 }}
      >
        <MenuItem value='1'>단일공개</MenuItem>
        <MenuItem value='2'>전체공개</MenuItem>
      </Select>

      <FeedRecommendations
        Feeds={productImgs}
        onAddFeed={addProduct}
        onRemoveFeed={removeProduct}
        onFeedsChange={handleProductChange}
      />

      <Button
        variant='contained'
        color='primary'
        fullWidth
        onClick={handleSubmit}
      >
        등록하기
      </Button>
    </Box>
  );
};

export default PostForm;
