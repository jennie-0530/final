import { Container, Typography } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className="">
      {/* 화면 전체를 차지하는 레이아웃 */}

      <Container maxWidth="md" sx={{ marginTop: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          color="primary"
        >
          Header
        </Typography>
      </Container>
      <div className="">
        {/* 본문을 유동적으로 차지 */}
        <Outlet />
      </div>
      <Container maxWidth="md" sx={{ marginTop: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          color="primary"
        >
          Footer
        </Typography>
      </Container>
    </div>
  );
};

export default Layout;
