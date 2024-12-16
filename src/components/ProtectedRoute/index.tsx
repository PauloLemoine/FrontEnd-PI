import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { token, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      return navigate('/home');
    }
  }, [token]);

  if (!user.cpf) {
    return <h1>Não possui acesso</h1>;
  }

  return children;
};

export default ProtectedRoute;
