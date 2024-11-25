import { useState, useEffect, useCallback } from "react";
import MyInfo from "../components/MyPage/MyInfo";
import { useUserStore } from "../store/userStore";
import { fetchUserInfo } from "../util/myPageApi";
import MyMenu from "../components/MyPage/MyMenu";
import { Outlet } from "react-router-dom";
import EditProfileForm from "../components/MyPage/EditProfileForm";

const MyPage = () => {
  const { user, setUser } = useUserStore();
  const [userId, setUserId] = useState<string>("1"); // 기본 User ID
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태

  const fetchData = useCallback(async () => {
    try {
      const userInfo = await fetchUserInfo(userId);
      setUser(userInfo);
    } catch (error) {
      console.error("Error fetching user info:", error);
      setUser(null);
    }
  }, [userId, setUser]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      {!isEditing ? (
        <>
          <MyInfo
            user={user}
            setUser={setUser}
            setUserId={setUserId}
            setIsEditing={setIsEditing}
          />
          <MyMenu user={user} userId={userId} />
          <Outlet key={userId} />
        </>
      ) : (
        <EditProfileForm
          user={user}
          setUser={setUser}
          setIsEditing={setIsEditing}
          refreshUserData={fetchData} // 수정 완료 후 데이터를 다시 가져오는 함수 전달
        />
      )}
    </div>
  );
};

export default MyPage;
