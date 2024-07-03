import Header from '../../components/header'
import membros from '../../mocks/members'
import CardMember from './card-member'
import Banner from '../../../assets/download.jpg'

import styles from './style.module.css'

export default function AboutUs(){

    return (
        <div>
            <Header/>
            <div className={styles.aboutUsContext}>
                <h2 className={styles.aboutUsTitle}>Sobre nós</h2>
                <p className={styles.aboutUsP}>Somos um grupo de estudantes da Universidade de Brasília (UnB) dedicados a facilitar o acesso à informação sobre licitações e promover a transparência pública nesse processo. Nosso objetivo é criar ferramentas que simplifiquem o entendimento e a consulta de dados de licitações, contribuindo para uma gestão pública mais transparente e eficiente.</p>
                <img className={styles.aboutUsImg} src={Banner} alt='Foto de toda a equipe'/>
                <h2 className={styles.aboutUsTitle}>Agora, um pouco de cada um</h2>
                {membros.map(membro => <CardMember key={membro.id} {...membro} />)}
            </div>

        </div>
    )
}
