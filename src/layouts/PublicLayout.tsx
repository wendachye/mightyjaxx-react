import { Navigate, Outlet } from 'react-router-dom';
import { selectUser } from 'redux/slices/userSlice';

import { useSelector } from 'hooks/useRedux';

const PublicLayout = () => {
  const user = useSelector(selectUser);

  if (user.isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicLayout;
