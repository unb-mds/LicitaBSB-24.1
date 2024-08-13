import { useState, useEffect } from 'react';
import {
  getLicitacaoById,
  getLicitacoes,
} from '../services/licitacoes.service';

export default function useLoadData(id = null) {
  const [licitData, setLicitData] = useState({});
  const [maisLicitacoes, setMaisLicitacoes] = useState([]);

  const loadData = async () => {
    if (id !== null) {
      const data = await getLicitacaoById(id);
      setLicitData(data);
    }
    const maisLicit = await getLicitacoes();
    setMaisLicitacoes(maisLicit.results.slice(0, 3));
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    licitData,
    maisLicitacoes,
  };
}
