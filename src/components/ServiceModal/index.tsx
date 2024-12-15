import { useEffect, useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { IEmployee } from '../../interfaces/IEmployee';
import { IService } from '../../interfaces/IService';
import employeeService from '../../services/employeeService';
import styles from './styles.module.css';

const ServiceModal = ({
  servico,
  onClose,
}: {
  servico: IService;
  onClose: () => void;
}) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [employees, setEmployes] = useState<IEmployee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [dateError, setDateError] = useState<string>('');
  const [timeError, setTimeError] = useState<string>('');
  const { addToCart } = useCart();

  useEffect(() => {
    const getAllEmployees = async () => {
      const servicesData = await employeeService.getAll();
      setEmployes(servicesData);
    };

    getAllEmployees();
  }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    const day = new Date(selectedDate).getDay();

    if (day === 0 || day === 6) {
      setDateError('Não é permitido selecionar sábados ou domingos.');
    } else {
      setDateError('');
      setSelectedDate(selectedDate);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTime = e.target.value;
    const [hours] = selectedTime.split(':').map(Number);

    if (hours < 8 || hours >= 18) {
      setTimeError('O horário deve ser entre 08:00 e 18:00.');
    } else {
      setTimeError('');
      setSelectedTime(selectedTime);
    }
  };

  const handleSubmit = () => {
    const formattedDateTime = `${selectedDate} ${selectedTime}`;

    const employeeId = parseInt(selectedEmployee, 10);

    const selectedEmp = employees.find(
      (employee) => employee.id === employeeId
    );

    if (selectedEmp) {
      console.log(selectedEmp);
      addToCart({
        id: servico.id,
        employee: selectedEmp,
        nome: servico.nome,
        preco: servico.preco,
        data_hora: formattedDateTime,
      });

      alert('Serviço adicionado ao carrinho com sucesso!');
      onClose();
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h1>Agendar Serviço</h1>

        <h3>Serviço: {servico.nome}</h3>
        <label>
          Data:
          <input type='date' value={selectedDate} onChange={handleDateChange} />
        </label>
        {dateError && <p className={styles.errorText}>{dateError}</p>}

        <label>
          Hora:
          <input type='time' value={selectedTime} onChange={handleTimeChange} />
        </label>
        {timeError && <p className={styles.errorText}>{timeError}</p>}

        <label>
          Funcionário:
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value=''>Selecione um funcionário</option>
            {employees &&
              employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.nome}
                </option>
              ))}
          </select>
        </label>
        <div className={styles.buttonContainer}>
          <button
            className={styles.checkoutButton}
            onClick={handleSubmit}
            disabled={
              !!dateError ||
              !!timeError ||
              !selectedDate ||
              !selectedTime ||
              !selectedEmployee
            }
          >
            Adicionar ao carrinho
          </button>
          <button className={styles.closeButton} onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
