import React, { useState, useEffect } from 'react';
import MyInfo from '../components/MyPage/MyInfo';
import LikeList from '../components/MyPage/FavoriteList';
import { useUserStore } from '../store/userStore';
import { User } from '../store/userStore'; // User 타입을 가져옵니다
import axios from 'axios';

const MyPage = () => {
  const { user, setUser } = useUserStore();
  const [likes, setLikes] = useState<any[]>([]); // 좋아요한 피드 데이터를 저장할 상태 추가

  const fetchLikes = async (userId: string) => {
    try {
      const response = await axios.get(`http://localhost:4000/user/${userId}/likes`);
      setLikes(response.data);
    } catch (error) {
      console.error('Error fetching likes:', error);
      setLikes([]);
    }
  };

  useEffect(() => {
    if (user && user.id) {
      fetchLikes(user.id.toString());
    }
  }, [user]);

  return (
    <div>
      <MyInfo user={user} setUser={setUser} />
      <LikeList user={user} setUser={setUser} likes={likes} /> {/* LikeList 컴포넌트에 likes 전달 */}
    </div>
  );
};

export default MyPage;
