import { Link } from 'react-router-dom';
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
            <li>
              <Link to={'/licitacoes'}>
                <p>Licitações</p>
              </Link>
            </li>
            <li>
              <Link to={'/sobrelicitacao'}>
                <p>Sobre as Licitacoes</p>
              </Link>
            </li>
            <li>
              <Link to={'/sobrenos'}>
                <p>Sobre a Equipe</p>
              </Link>
            </li>
            <li>
              <Link to={'/dashboard'}>
                <p>Dashboard</p>
              </Link>
            </li>
          </ul>
        </div>
        <img src={logoUnb} />
      </nav>
    </footer>
  );
};

export default Footer;
