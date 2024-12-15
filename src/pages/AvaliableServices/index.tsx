import { useEffect, useState } from 'react';
import { IService } from '../../interfaces/IService';
import servicesService from '../../services/servicesService';

import ServiceModal from '../../components/ServiceModal';

import styles from './styles.module.css';

const AvaliableServices = () => {
  const [services, setServices] = useState<IService[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalServiceOpen, setModalServiceOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<IService | null>(null);

  const handleModalServiceOpen = (service: IService) => {
    setSelectedService(service);
    setModalServiceOpen(true);
  };

  const handleModalServiceClose = () => {
    setModalServiceOpen(false);
    setSelectedService(null);
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesData = await servicesService.getAll();
        setServices(servicesData);
        setError(null);
      } catch (err) {
        setError('Não foi possível carregar os serviços.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <div>Carregando serviços...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>ESCOLHA SEU</h1>
        <h1 className={styles.title}>SERVIÇO</h1>
      </div>
      <ul className={styles.servicesList}>
        {services.map((service) => (
          <li key={service.id} className={styles.listItem}>
            <div>
              <h2>{service.nome}</h2>
            </div>

            <strong>R$ {service.preco}</strong>

            <button
              className={styles.modalButton}
              onClick={() => handleModalServiceOpen(service)}
            >
              Agendar
            </button>
          </li>
        ))}
      </ul>
      {isModalServiceOpen && selectedService && (
        <ServiceModal
          servico={selectedService}
          onClose={handleModalServiceClose}
        />
      )}
    </div>
  );
};

export default AvaliableServices;
