import logoLicitaBSB from '../../../assets/logo.png';
import logoUnb from '../../../assets/logoUnb.png';
import styles from './style.module.css';

const Footer = () => {
  return (
    <footer className={styles.footerEstilizada}>
      <div className={styles.linhaEstilizada}></div>
      <nav className={styles.navEstilizada}>
        <div>
          <img src={logoLicitaBSB} />
          <ul>
            <a to={'/licitacoes'}>
              <p>Licitações</p>
            </a>
            <a to={'/sobrelicitacao'}>
              <p>Sobre as Licitações</p>
            </a>
            <a to={'/sobrenos'}>
              <p>Sobre a Equipe</p>
            </a>
            <a to={'/dashboard'}>
              <p>Dashboard</p>
            </a>
          </ul>
        </div>
        <img src={logoUnb} />
      </nav>
    </footer>
  );
};

export default Footer;
