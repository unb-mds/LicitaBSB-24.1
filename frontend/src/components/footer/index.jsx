import styled from "styled-components"
import logoLicitaBSB from '../../../assets/logo.png'
import { Link } from "react-router-dom"
import logoUnb from "../../../assets/logoUnb.png"

const FooterEstilizada = styled.footer`
    background-color: #474747;
    /* position: fixed;
    bottom: 0; */
    width: 100%;
    height: 18rem;
    margin-top: 5rem;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    flex-direction: column;

`
const LinhaEstilizada = styled.div`
    width: 95%;
	display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 1rem;
    margin-top: 1rem;
    /* margin-bottom: 1rem; */
    border-bottom: 1px solid var(--branco);
`
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
    div{
        display: flex;
        flex-direction: row;
        gap: 2rem;
    }
    div img{
        width: 14rem;
        height: 8rem;
    }
    div ul{
        list-style: none;
        padding: 0;
        margin: 0;
        width: 14rem;
        height: 8rem;
        display: flex;
        flex-direction: column;
        gap: .8rem;
        p{
            text-decoration: none;
            font-size: 1.5rem;
            color: #E9E4DF;
        }
    }
`

const Footer = () => {
    return(<FooterEstilizada>
        <LinhaEstilizada></LinhaEstilizada>
        <NavEstilizada>
            <div>
                <img src={logoLicitaBSB}/>
                <ul>
                    <Link to={'/licitacoes'}><p>Licitações</p></Link>
                    <Link to={'/sobrelicitacao'}><p>Sobre as Licitações</p></Link>
                    <Link to={'/sobrenos'}><p>Sobre a Equipe</p></Link>
                    <Link to={'/dashboard'}><p>Dashboard</p></Link>
                </ul>
            </div>
            <img src={logoUnb}/>
        </NavEstilizada>
    </FooterEstilizada>)
}

export default Footer