import { createContext, useState } from 'react';
import { getLicitacoes } from '../services/licitacoes.service';

export const BiddingContext = createContext();
BiddingContext.displayName = 'Bidding';

export const BiddingProvider = ({ children }) => {
  const licitacoes = getLicitacoes();
  const [biddings, setBiddgins] = useState([...licitacoes]);
  const [words, setWords] = useState('');
  const [searchBiddings, setSearchBiddgins] = useState([]);
  return (
    <BiddingContext.Provider
      value={{
        biddings,
        setBiddgins,
        searchBiddings,
        setSearchBiddgins,
        words,
        setWords,
      }}
    >
      {children}
    </BiddingContext.Provider>
  );
};
