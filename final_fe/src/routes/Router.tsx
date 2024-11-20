import Layout from '../components/common/Layout';
import Main from '../page/Main';
import Write from '../page/Write';
import MyPage from '../page/MyPage'; // 'page' 대신 'pages'로 경로 수정

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Main />, index: true },
      { path: '/write', element: <Write />, index: true },
      { path: '/mypage', element: <MyPage />, index: true },
    ],
  },
];
