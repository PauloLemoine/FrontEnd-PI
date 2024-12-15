import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import useNavigation from '../../lib/navigate';
import userService from '../../services/userService';
import styles from './styles.module.css';

const schema = z
  .object({
    nome: z
      .string()
      .min(3, {
        message: 'O nome deve ter pelo menos 3 caracteres.',
      })
      .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, {
        message: 'O nome não pode conter números.',
      }),
    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),
    senha: z
      .string()
      .min(8, 'A senha deve ter pelo menos 8 caracteres')
      .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
      .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
      .regex(/\d/, 'A senha deve conter pelo menos um número'),
    confirmar_senha: z.string(),
  })
  .refine((data) => data.senha === data.confirmar_senha, {
    message: 'As senhas devem ser iguais.',
    path: ['confirmar_senha'],
  });
type FormValues = z.infer<typeof schema>;

const Register = () => {
  const navigate = useNavigation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      if (data.senha === data.confirmar_senha) {
        await userService.create(data);
        alert('Usuário registrado com sucesso!');
        navigate('/login');
      }
    } catch (error) {
      if (error instanceof Error) {
        alert('Erro ao criar usuário.');
        console.log(error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Cadastro</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nome Completo</label>
            <input {...register('nome')} className={styles.input} />
            {errors.nome?.message && (
              <p className={styles.errorMessage}>{errors.nome.message}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>CPF</label>
            <input {...register('cpf')} className={styles.input} />
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

          <div className={styles.formGroup}>
            <label className={styles.label}>Confirmar Senha</label>
            <input
              type='password'
              {...register('confirmar_senha')}
              className={styles.input}
            />
            {errors.confirmar_senha && (
              <p className={styles.errorMessage}>
                {errors.confirmar_senha.message}
              </p>
            )}
          </div>

          <button type='submit' className={styles.submitButton}>
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
