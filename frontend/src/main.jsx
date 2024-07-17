import React from 'react';
import ReactDOM from 'react-dom/client';
import Landing from './pages/landing';
import AboutBidding from './pages/about-bidding';
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from 'react-router-dom';
import './styles/global.css';
import AboutUs from './pages/about-us';
import Dashboard from './pages/dashboard';
import BiddingList from './pages/bidding-list';
import BiddingPage from './pages/bidding-page';
import Header from './components/header';
import Footer from './components/footer';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Landing />
//   },
//   {
//     path: "/sobrelicitacao",
//     element: <AboutBidding/>
//   },
//   {
//     path: "/sobrenos",
//     element: <AboutUs/>
//   },
//   // {
//   //   path: "/dashboard",
//   //   element: <Dashboard />
//   // },
//   {
//     path: "/licitacoes",
//     element: <BiddingList />
//   },
//   <Route path='/licitacao'>
//     <BiddingPage/>
//   </Route>
// ])

function AppRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sobrelicitacao" element={<AboutBidding />} />
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
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <AppRoutes />
  </React.StrictMode>,
);
