import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAuth } from '../../hooks/useAuth';

import styles from './styles.module.css';

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

const schema = z.object({
  cpf: z.string().regex(cpfRegex, 'CPF inválido'),
  senha: z
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
    .regex(/\d/, 'A senha deve conter pelo menos um número'),
});

type FormValues = z.infer<typeof schema>;

const Login = () => {
  const auth = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      auth.handleLogin(data.cpf, data.senha);
      alert('Login realizado com sucesso!');
    } catch (error) {
      if (error instanceof Error) {
        alert('Erro ao realizar login.');
        console.log(error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>CPF</label>
            <input
              type='text'
              {...register('cpf')}
              className={styles.input}
              placeholder='000.000.000-00'
            />
            {errors.cpf && (
              <p className={styles.errorMessage}>{errors.cpf.message}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Senha</label>
            <input
              type='password'
              {...register('senha')}
              className={styles.input}
            />
            {errors.senha && (
              <p className={styles.errorMessage}>{errors.senha.message}</p>
            )}
          </div>

          <button type='submit' className={styles.submitButton}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
