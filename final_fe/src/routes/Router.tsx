import Layout from '../components/common/Layout';
import Main from '../page/Main';
import Write from '../page/Write';
import MyPage from '../page/MyPage';
import LikeList from '../components/MyPage/LikeList';
import FollowList from '../components/MyPage/FollowList';
import FeedList from '../components/MyPage/FeedList';

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Main />, index: true },
      { path: '/write', element: <Write />, index: true },
      {
        path: '/mypage',
        element: <MyPage />,
        children: [
          {
            path: ':userId/likes',
            element: <LikeList />,
          },
          {
            path: ':userId/follows',
            element: <FollowList />,
          },
          {
            path: ':userId/feeds',
            element: <FeedList />,
          },
          {
            path: ':userId/membership',
            element: <LikeList />,
          },
          {
            path: ':userId/membership/manage',
            element: <LikeList />,
          },
        ],
      },
    ],
  },
];
