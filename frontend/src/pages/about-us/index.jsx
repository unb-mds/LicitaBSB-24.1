import membros from '../../mocks/members';
import CardMember from './card-member';
import styles from './style.module.css';
import fotoemgrupo from '../../../assets/download.jpg'; // Importa a imagem corretamente

export default function AboutUs() {
  return (
    <div className={styles.aboutUsContext}>
      <h2 className={styles.aboutUsTitle}>Sobre nós</h2>

      <p className={styles.aboutUsP} data-testid="desc-testid">
        Somos um grupo de estudantes da Universidade de Brasília (UnB) dedicados
        a facilitar o acesso à informação sobre licitações e promover a
        transparência pública nesse processo. Nosso objetivo é criar ferramentas
        que simplifiquem o entendimento e a consulta de dados de licitações,
        contribuindo para uma gestão pública mais transparente e eficiente.
      </p>

      <img
        className={styles.aboutUsImg}
        data-testid="photo-testid"
        src={fotoemgrupo} 
        alt="Foto de toda a equipe"
      />

      <h2 className={styles.aboutUsTitle}>Agora, um pouco de cada um</h2>

      <ul>
        {membros.map((membro) => (
          <CardMember
            key={membro.id}
            nome={membro.nome}
            descricao={membro.descricao}
            github={membro.github}
            id={membro.id}
          />
        ))}
      </ul>
    </div>
  );
}
