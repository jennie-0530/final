import Layout from '../components/common/Layout';
import Main from '../page/Main';
import Write from '../page/Write';

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Main />, index: true },
      { path: '/write', element: <Write />, index: true },
    ],
  },
];
