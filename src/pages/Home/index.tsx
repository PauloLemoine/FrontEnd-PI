import { useEffect, useState } from 'react';
import banner from '../../assets/hero.png';
import { IService } from '../../interfaces/IService';
import servicesService from '../../services/servicesService';
import styles from './styles.module.css';

const Home = () => {
  const [services, setServices] = useState<IService[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const servicesData = await servicesService.getHome();
      setServices(servicesData);
    };

    fetchServices();
  }, []);

  return (
    <section className={styles.container}>
      <div
        className={styles.heroImg}
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        <div className={styles.heroTxt}>
          <h1 className={styles.textBlue}>Venha nos</h1>
          <h1 className={styles.textOrange}>Conhecer</h1>
        </div>
      </div>
      <div className={styles.popularServices}>
        <h2 className={styles.textBlue}>Serviços</h2>
        <h2 className={styles.textOrange}>Recomendados</h2>
        <div className={styles.serviceGrid}>
          {services.map((service) => (
            <div className={styles.serviceCard} key={service.id}>
              <img src={service.img_url} alt='servico' />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.infoCard}>
          <div>
            <h2 className={styles.infoCardTitle}>Horários</h2>
            <p>Segunda a sexta-feira, das 8h às 18h</p>
            <p>Sábados, das 9h às 15h.</p>
          </div>
        </div>
        <div className={styles.infoCard}>
          <h2 className={styles.infoCardTitle}>Localização</h2>
          <p>Endereço: R. do Pombal, 57 - Santo Amaro, Recife - PE</p>
          <p>50100-170</p>
        </div>
      </div>
    </section>
  );
};

export default Home;
