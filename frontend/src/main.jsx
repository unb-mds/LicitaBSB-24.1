import React from 'react';
import ReactDOM from 'react-dom/client';
import Landing from './pages/landing';
import AboutBidding from './pages/about-bidding';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/global.css';
import AboutUs from './pages/about-us';
import Dashboard from './pages/dashboard';
import BiddingList from './pages/bidding-list';
import BiddingPage from './pages/bidding-page';
import Header from './components/header';
import Footer from './components/footer';
import { BiddingProvider } from './context/BiddingContext';
import BiddingSearchList from './pages/bidding-search-list';
import { Error } from './pages/error';
import Newsletter from './components/newsletter';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AboutBot from './pages/about-bot';

function AppRoutes() {
  return (
    <BrowserRouter>
      <BiddingProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<Error />} />
          <Route path="/sobrelicitacao" element={<AboutBidding />} />
          <Route path="/sobrebot" element={<AboutBot />} />
          <Route path="/sobrenos" element={<AboutUs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/licitacoes" element={<BiddingList />} />
          <Route path="/licitacoes/:id" element={<BiddingPage />} />
          <Route path="/resultadobusca/:word" element={<BiddingSearchList />} />
        </Routes>
        <Footer />
      </BiddingProvider>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AppRoutes />
    </LocalizationProvider>
  </React.StrictMode>,
);
