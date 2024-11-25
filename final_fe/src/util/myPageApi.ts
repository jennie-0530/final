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
    return response.data; // 정상적인 데이터 반환
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return [];
    }

    // 다른 에러는 그대로 던짐
    console.error("Error fetching likes:", error);
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

export const fetchUserModify = async (id: string, updatedData: any) => {
  try {
    console.log("Sending updated data:", updatedData); // 보낼 데이터 확인
    const response = await axios.put(
      `http://localhost:4000/user/${id}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user info:", error);
    throw error;
  }
};