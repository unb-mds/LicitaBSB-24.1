import { Link } from 'react-router-dom';
import logoLicitaBSB from '../../../assets/logo.png';
import logoUnb from '../../../assets/logoUnb.png';
import logoTwitter from '../../../assets/twitter.svg';
import logoTeste from '../../../assets/google.svg';
import styles from './style.module.css';

const Footer = () => {
  return (
    <footer className={styles.footerEstilizada}>
      <div className={styles.linhaEstilizada}></div>
      <nav className={styles.navEstilizada}>
        <div>
          <Link to={'/'}>
            <img src={logoLicitaBSB} />
          </Link>
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
            <li> 
            <div className="horizontal-container">
            <a href='https://x.com/licitabsb'>
              <p>Nos siga nas outras redes </p> 
              <p> <img src={logoTwitter} width={25}/> </p>
            </a>
            <a href='mailto:unb.licitabsb@gmail.com'>
              <p>Fale Conosco</p>
              <img src={logoTeste} width={25}/>
            </a>
          </div>
        </li>
          </ul>
        </div>
        <img src={logoUnb} />
      </nav>
    </footer>
  );
};

export default Footer;
