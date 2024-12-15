import { Route, Routes } from 'react-router-dom';

import User from '../components/User';

import Cart from '../pages/Cart';
import UserSchedules from '../pages/UserSchedules';
import { userRoutes } from './routes';

const UserRoutes = () => (
  <Routes>
    <Route path={userRoutes.index} element={<User />} />
    <Route path={userRoutes.cart} element={<Cart />} />
    <Route path={userRoutes.schedulingServices} element={<UserSchedules />} />
  </Routes>
);

export default UserRoutes;
