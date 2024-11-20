import axiosInstance from '../client/index';

export const feedWrite = async (formData: FormData) => {
  try {
    const res = await axiosInstance.post('/feed', formData);
    return res;
  } catch (error) {
    console.error('Error uploading product', error);
    alert('Failed to upload product');
  }
};
