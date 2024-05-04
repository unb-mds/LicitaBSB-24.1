import styles from './style.module.css'
import { FaGithub } from "react-icons/fa";

export default function CardMember({nome, descricao, github, id}){
    
    // const foto = require(`../../../../assets/members/${id}.jpg`)

    return(
        <div>
            <h3>{nome}</h3>
            <p>{descricao}</p>
            <a href={github}>
                <FaGithub/>
            </a>
            <img src={`../../../../assets/members/${id}.jpg`} alt='Foto do membro'/>
        
        </div>
    )
}