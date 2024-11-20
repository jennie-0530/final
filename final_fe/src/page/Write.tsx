import { useLayoutEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/common/ProductForm';

const Write = () => {
  // const navigate = useNavigate();
  // useLayoutEffect(() => {
  //   const sessionUser = sessionStorage.getItem('user_id');
  //   if (!sessionUser) {
  //     return navigate('/login');
  //   }
  // });

  return (
    <div>
      <ProductForm />
    </div>
  );
};

export default Write;
