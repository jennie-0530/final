import { useState, useEffect, useCallback } from "react";
import MyInfo from "../components/MyPage/MyInfo";
import { useUserStore } from "../store/userStore";
import { fetchUserInfo } from "../util/myPageApi";
import MyMenu from "../components/MyPage/MyMenu";
import { Outlet } from "react-router-dom";

const MyPage = () => {
  const { user, setUser } = useUserStore();
  const [userId, setUserId] = useState<string>("1"); // 기본 User ID

  const fetchData = useCallback(async () => {
    try {
      const userInfo = await fetchUserInfo(userId);
      setUser(userInfo);
      // console.log("userInfo: ", userInfo);
    } catch (error) {
      console.error("Error fetching user info:", error);
      setUser(null); // user 정보를 초기화 (필요한 경우만)
    }
  }, [userId, setUser]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <MyInfo user={user} setUser={setUser} setUserId={setUserId} />
      <MyMenu user={user} userId={userId} />
      <Outlet key={userId} />
    </div>
  );
};

export default MyPage;
