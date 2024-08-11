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
              <p>
                Fale Conosco:{' '}
                <a
                  data-testid="link-fale-conosco"
                  className={styles.mailLink}
                  href="mailto:unb.licitabsb@gmail.com"
                >
                  unb.licitabsb@gmail.com
                </a>
              </p>
            </li>
            <li>
              <a
                data-testid="link-redes-sociais"
                target="blank"
                href="https://x.com/licitabsb"
              >
                <p>Nos siga nas outras redes</p>
                <img src={logoTwitter} width={25} />
              </a>
            </li>
          </ul>
        </div>
        <img src={logoUnb} />
      </nav>
    </footer>
  );
};

export default Footer;
