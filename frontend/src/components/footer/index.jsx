import styled from 'styled-components';
import logoLicitaBSB from '../../../assets/logo.png';
import logoUnb from '../../../assets/logoUnb.png';

const FooterEstilizada = styled.footer`
  background-color: #474747;
  width: 100%;
  height: 18rem;
  margin-top: 5rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width: 740px) {
    height: 320px;
  }
`;
const LinhaEstilizada = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  margin-top: 1rem;
  /* margin-bottom: 1rem; */
  border-bottom: 1px solid var(--branco);
  @media (max-width: 740px) {
    margin-top: 0.2rem;
  }
`;
const NavEstilizada = styled.nav`
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2rem;
  align-items: center;
  height: 15rem;
  padding: 0 2rem;
  div {
    display: flex;
    flex-direction: row;
    gap: 2rem;
  }
  div img {
    width: 238px;
    height: 109px;
  }
  div ul {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 14rem;
    height: 8rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    p {
      text-decoration: none;
      font-size: 1.5rem;
      color: #e9e4df;
    }
  }
  @media (max-width: 740px) {
    flex-direction: column;
    gap: 0.5rem;
    img {
      margin-top: 1rem;
      width: 96px;
      height: 48px;
    }
    div {
      gap: 0.2rem;
      flex-direction: column;
      img {
        width: 263px;
        height: 64px;
      }
      ul p {
        font-size: 18px;
      }
    }
  }
`;

const Footer = () => {
  return (
    <FooterEstilizada>
      <LinhaEstilizada></LinhaEstilizada>
      <NavEstilizada>
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
      </NavEstilizada>
    </FooterEstilizada>
  );
};

export default Footer;
