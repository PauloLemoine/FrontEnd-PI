import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';

import useNavigation from '../../lib/navigate';

import scheduleService from '../../services/scheduleService';

import styles from './styles.module.css';

const PaymentModal = ({ onClose }: { onClose: () => void }) => {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();

  const navigate = useNavigation();

  const formatDate = (date: string) => {
    const [datePart, timePart] = date.split(' ');
    const [year, month, day] = datePart.split('-');
    return { formattedDate: `${day}/${month}/${year}`, time: timePart };
  };

  const totalCart = cart.reduce((acc, item) => acc + Number(item.preco), 0);

  const handleSubmit = async () => {
    try {
      if (cart.length === 0) {
        alert('Carrinho vazio!');
        return;
      }

      if (!user.id) {
        alert('Usuário não encontrado!');
        return;
      } else {
        await Promise.all(
          cart.map((item) =>
            scheduleService.createScheduling({
              usuarioId: Number(user.id),
              funcionarioId: item.employee.id,
              servicoId: item.id,
              data_hora: item.data_hora,
            })
          )
        );

        alert('Todos os agendamentos foram realizados com sucesso!');
        clearCart();
        navigate('/conta');
      }
    } catch (error) {
      console.error('Erro ao realizar agendamento:', error);
      alert('Ocorreu um erro ao processar o agendamento. Tente novamente.');
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h1>Finalizar Pedido</h1>

        {cart.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <>
            <ul className={styles.cartList}>
              {cart.map((item, index) => {
                const { formattedDate, time } = formatDate(item.data_hora);
                return (
                  <li key={index}>
                    <strong>{item.nome}</strong> - {formattedDate} às {time} -
                    R$
                    {item.preco}
                  </li>
                );
              })}
            </ul>

            <div className={styles.totalContainer}>
              <strong>Total:</strong> R$ {totalCart}
            </div>
          </>
        )}

        {cart.length > 0 && (
          <div className={styles.buttonContainer}>
            <button className={styles.checkoutButton} onClick={handleSubmit}>
              Confirmar Agendamentos
            </button>
            <button className={styles.closeButton} onClick={onClose}>
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
