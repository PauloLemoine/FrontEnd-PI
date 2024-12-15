import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider } from '../contexts/AuthProvider';
import { CartProvider } from '../contexts/CartProvider';

import LoggedUser from './LoggedUser';
import { defaultRoutes } from './routes';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

import Navbar from '../components/Navbar';
import NotFound from '../components/NotFound';
import ProtectedRoute from '../components/ProtectedRoute';

const Router = () => (
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <>
          <Navbar />
          <Routes>
            <Route
              path={defaultRoutes.account}
              element={
                <ProtectedRoute>
                  <LoggedUser />
                </ProtectedRoute>
              }
            />
            <Route path={defaultRoutes.home} element={<Home />} />
            <Route path={defaultRoutes.login} element={<Login />} />
            <Route path={defaultRoutes.register} element={<Register />} />
            <Route path={defaultRoutes.notfound} element={<NotFound />} />
          </Routes>
        </>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default Router;
