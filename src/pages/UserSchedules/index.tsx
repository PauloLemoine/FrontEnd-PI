/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { IEmployee } from '../../interfaces/IEmployee';
import { ISchedule } from '../../interfaces/ISchedule';
import employeeService from '../../services/employeeService';
import scheduleService from '../../services/scheduleService';
import servicesService from '../../services/servicesService';
import styles from './styles.module.css';

const getAgendamentosDetails = async (agendamentos: any[]) => {
  const agendamentosComDetalhes = await Promise.all(
    agendamentos.map(async (agendamento) => {
      const servico = await servicesService.getById(agendamento.servicoId);

      const funcionarios = await employeeService.getAll();
      const funcionarioSelecionado = funcionarios.find(
        (func: IEmployee) => func.id === agendamento.funcionarioId
      );

      return {
        ...agendamento,
        servico: servico,
        funcionario: funcionarioSelecionado,
      };
    })
  );

  return agendamentosComDetalhes;
};

const formatDate = (date: string) => {
  const [datePart, timePart] = date.split(' ');
  const [year, month, day] = datePart.split('-');
  return { formattedDate: `${day}/${month}/${year}`, time: timePart };
};

const UserSchedules = () => {
  const [schedulings, setSchedulings] = useState<ISchedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const { user } = useAuth();

  useEffect(() => {
    const getAllSchedulings = async () => {
      try {
        if (user.id) {
          const schedulingData = await scheduleService.getSchedulingsByUser(
            user.id
          );
          const agendamentos = Array.isArray(schedulingData)
            ? schedulingData
            : [schedulingData];

          const agendamentosComDetalhes = await getAgendamentosDetails(
            agendamentos
          );

          setSchedulings(agendamentosComDetalhes);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setError('Erro ao carregar os agendamentos.');
        setLoading(false);
      }
    };

    getAllSchedulings();
  }, [user.id]);

  if (loading) {
    return <p>Carregando agendamentos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.schedulesContainer}>
      <h1>Meus Agendamentos</h1>
      {schedulings.length === 0 ? (
        <p>Você não tem agendamentos.</p>
      ) : (
        <ul className={styles.schedulesList}>
          {schedulings.map((scheduling) => {
            const { formattedDate, time } = formatDate(scheduling.data_hora);
            return (
              <li key={scheduling.id} className={styles.scheduleItem}>
                <div>
                  <h2>{scheduling.servico.nome}</h2>
                  <p>Atendido por: {scheduling.funcionario?.nome}</p>
                </div>
                <p>Preço: R${scheduling.servico?.preco}</p>
                <div>
                  <p>Data: {formattedDate}</p>
                  <p>Hora: {time}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default UserSchedules;
