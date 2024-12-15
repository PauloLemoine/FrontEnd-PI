import logo from '../../assets/logo.png';
import { useAuth } from '../../hooks/useAuth';
import useNavigation from '../../lib/navigate';
import styles from './styles.module.css';

const Navbar = () => {
  const navigate = useNavigation();
  const { token, user, handleLogout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <div
        className={styles.logoContainer}
        onClick={
          token && user ? () => navigate('/conta') : () => navigate('/home')
        }
      >
        <img
          className={styles.logo}
          src={logo}
          alt='Logo da instituição senac'
        />
        {token && user && (
          <span className={styles.welcomeMessage}>Bem-vindo, {user.nome}!</span>
        )}
      </div>
      <div
        className={
          token && user ? styles.loggedContainer : styles.notLoggedContainer
        }
      >
        {token && user ? (
          <>
            <button
              type='button'
              className={styles.button}
              onClick={() => navigate('/conta/servicos-agendados/')}
            >
              Meus agendamentos
            </button>
            <button
              type='button'
              className={styles.button}
              onClick={() => navigate('/conta/carrinho')}
            >
              Carrinho
            </button>
            <button
              type='button'
              className={styles.button}
              onClick={handleLogout}
            >
              Sair
            </button>
          </>
        ) : (
          <>
            <button
              type='button'
              className={styles.button}
              onClick={() => navigate('/login')}
            >
              Entrar
            </button>
            <button
              type='button'
              className={styles.button}
              onClick={() => navigate('/cadastro')}
            >
              Cadastre-se
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
