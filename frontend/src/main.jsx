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
import { Error } from './pages/error';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AboutBot from './pages/about-bot';
import AboutBiddingDispatch from './pages/about-bidding-dispatch';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<Error />} />
        <Route path="/sobrelicitacao" element={<AboutBidding />} />
        <Route
          path="/sobredispensadelicitacao"
          element={<AboutBiddingDispatch />}
        />
        <Route path="/sobrebot" element={<AboutBot />} />
        <Route path="/sobrenos" element={<AboutUs />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/licitacoes" element={<BiddingList />} />
        <Route path="/licitacoes/:id" element={<BiddingPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <AppRoutes />
  </LocalizationProvider>,
);
