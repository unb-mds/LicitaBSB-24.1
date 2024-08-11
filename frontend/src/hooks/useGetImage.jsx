import { useState, useEffect } from 'react';

export default function useGetImage(url) {
  const [image, setImage] = useState('');
  useEffect(() => {
    import(url)
      .then((image) => {
        setImage(image.default);
      })
      .catch((err) => {
        console.log(`Erro ao carregar imagem (${url})`);
      });
  }, []);
  return image;
}
