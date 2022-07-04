import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectUser } from 'redux/slices/userSlice';

import Header from 'components/Header';
import { useSelector } from 'hooks/useRedux';

const ProtectedLayout = () => {
  const location = useLocation();
  const user = useSelector(selectUser);

  if (!user.isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
