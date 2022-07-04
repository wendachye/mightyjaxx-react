import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedLayout from 'layouts/ProtectedLayout';
import PublicLayout from 'layouts/PublicLayout';
import { history } from 'redux/store';
import { HistoryRouter as Router } from 'redux-first-history/rr6';

import { ProtectedRoutes } from './ProtectedRoutes';
import { PublicRoutes } from './PublicRoutes';

const AppRoutes = () => {
  return (
    <Router history={history}>
      <Routes>
        <Route element={<PublicLayout />}>
          {PublicRoutes.map(({ element, path }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
        <Route element={<ProtectedLayout />}>
          {ProtectedRoutes.map(({ element, path }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
        <Route path="*" element={<Navigate to="/products" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
