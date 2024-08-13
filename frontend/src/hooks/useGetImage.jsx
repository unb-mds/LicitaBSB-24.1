import { useEffect, useState } from 'react';

export default function useGetImage(id) {
  const [memberImage, setMemberImage] = useState('');

  useEffect(() => {
    import(`../../assets/members/${id}.jpg`)
      .then((image) => {
        setMemberImage(image.default);
      })
      .catch((err) => {
        console.error(`Erro ao carregar a imagem do membro ${id}:`, err);
      });
  }, [id]);

  return memberImage;
}
