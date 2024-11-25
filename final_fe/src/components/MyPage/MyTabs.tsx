import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { useUserStore } from "../../store/userStore";

const MyTabs: React.FC = () => {
  const { selectedTab, setSelectedTab, user } = useUserStore();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue); // Zustand를 통해 탭 상태 업데이트
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        centered
        sx={{
          "& .MuiTab-root": {
            fontSize: "1rem",
            fontWeight: "bold",
            textTransform: "none",
          },
          "& .Mui-selected": {
            color: "#9C27B0",
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "#9C27B0",
          },
        }}
      >
        <Tab label="좋아요" />
        <Tab label="팔로잉" />
        <Tab label="멤버쉽" />
        {user?.influencer && <Tab label="멤버쉽 플랜" />}{" "}
        {/* 인플루언서만 표시 */}
        <Tab label="게시글" />
      </Tabs>
    </Box>
  );
};

export default MyTabs;
