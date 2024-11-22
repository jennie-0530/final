import axios from 'axios';

export const fetchUserInfo = async (id: string) => {
  try {
    const response = await axios.get(`http://localhost:4000/user/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error; // 필요시 호출부에서 에러 처리
  }
};

export const fetchUserLikes = async (id: string) => {
  try {
    const response = await axios.get(`http://localhost:4000/user/${id}/likes`);
    // console.log('response.data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching likes:', error);
    throw error;
  }
};

export const fetchUserFeeds = async (id: string) => {
  try {
    const response = await axios.get(`http://localhost:4000/user/${id}/feeds`);
    // console.log('response.data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching feeds:', error);
    throw error;
  }
};

export const fetchUserFollowings = async (id: string) => {
  try {
    const response = await axios.get(`http://localhost:4000/user/${id}/follows`);
    // console.log('response.data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching follows:', error);
    throw error;
  }
};
