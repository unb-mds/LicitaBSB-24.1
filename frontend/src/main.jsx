import React from 'react'
import ReactDOM from 'react-dom/client'
import Landing from './pages/landing';
import AboutBidding from './pages/about-bidding';
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import './styles/global.css'
import AboutUs from './pages/about-us';
import Dashboard from './pages/dashboard';
import BiddingList from './pages/bidding-list';
import BiddingPage from './pages/bidding-page';
import Header from './components/header';
import Newsletter from './components/newsletter'

function AppRoutes(){
  return(
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='/sobrelicitacao' element={<AboutBidding/>}/>
        <Route path='/sobrenos' element={<AboutUs/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/licitacoes' element={<BiddingList/>}/>
        <Route path='/licitacoes/:id' element={<BiddingPage/>}/>
      </Routes>
      <Newsletter/>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRoutes/>
  </React.StrictMode>,
)
