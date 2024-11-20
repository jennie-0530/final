
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExampleComponent = ({ userId }) => {
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const response = await axios.get(`/api/feeds`);
        const allFeeds = response.data;

        // 특정 사용자가 좋아요한 피드만 필터링
        const likedFeeds = allFeeds.filter(feed => feed.likes.includes(userId.toString()));
        setFeeds(likedFeeds);
      } catch (error) {
        console.error('Error fetching feeds:', error);
      }
    };

    fetchFeeds();
  }, [userId]);

  return (
    <div>
      {feeds.map(feed => (
        <div key={feed.id}>
          <h3>{feed.title}</h3>
          <p>{feed.description}</p>
          {/* 기타 피드 정보 표시 */}
        </div>
      ))}
    </div>
  );
};

export default ExampleComponent;