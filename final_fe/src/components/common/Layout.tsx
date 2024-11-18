import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className=''>
      {/* 화면 전체를 차지하는 레이아웃 */}

      <div>헤더</div>
      <div className=''>
        {/* 본문을 유동적으로 차지 */}
        <Outlet />
      </div>
      <div>아래</div>
    </div>
  );
};

export default Layout;
