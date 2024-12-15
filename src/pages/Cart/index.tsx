import { useState } from 'react';
import PaymentModal from '../../components/PaymentModal';
import { useCart } from '../../hooks/useCart';
import { ICartItem } from '../../interfaces/ICartItem';
import styles from './styles.module.css';

const Cart = () => {
  const [isModalPaymentOpen, setModalPaymentOpen] = useState(false);

  const { cart, removeFromCart } = useCart();
  const formatDate = (date: string) => {
    const [datePart, timePart] = date.split(' ');
    const [year, month, day] = datePart.split('-');
    return { formattedDate: `${day}/${month}/${year}`, time: timePart };
  };

  if (cart.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h1>O carrinho está vazio!</h1>
      </div>
    );
  }

  const handleModalServiceOpen = () => {
    setModalPaymentOpen(true);
  };

  const handleModalServiceClose = () => {
    setModalPaymentOpen(false);
  };

  return (
    <>
      <div className={styles.cart}>
        <h1>Carrinho</h1>
        <ul className={styles.cartList}>
          {cart.map((item: ICartItem) => {
            const { formattedDate, time } = formatDate(item.data_hora);
            return (
              <li key={item.id} className={styles.cartItem}>
                <div>
                  <h2>Serviço: {item.nome}</h2>
                  <p>Preço: R${item.preco}</p>
                  <p>Data: {formattedDate}</p>
                  <p>Horário: {time}</p>
                  <p>Atendido por: {item.employee.nome}</p>
                </div>
                <button
                  className={styles.removeButton}
                  onClick={() => removeFromCart(item.id)}
                >
                  Remover
                </button>
              </li>
            );
          })}
        </ul>
        <button
          className={styles.checkoutButton}
          onClick={handleModalServiceOpen}
        >
          Finalizar compra
        </button>
      </div>
      {isModalPaymentOpen && <PaymentModal onClose={handleModalServiceClose} />}
    </>
  );
};

export default Cart;
