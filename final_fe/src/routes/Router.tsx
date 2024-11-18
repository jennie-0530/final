import Layout from '../components/common/Layout';
import Main from '../page/Main';

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [{ path: '/', element: <Main />, index: true }],
  },
];
