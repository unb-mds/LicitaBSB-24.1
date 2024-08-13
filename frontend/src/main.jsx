import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import Landing from './pages/landing';
import AboutBidding from './pages/about-bidding';
import AboutUs from './pages/about-us';
import BiddingList from './pages/bidding-list';
import BiddingPage from './pages/bidding-page';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AboutBot from './pages/about-bot';
import AboutLicitaBSB from './pages/about-licitaBSB';
import AboutBiddingDispatch from './pages/about-bidding-dispatch';
import Root from './root';

import './styles/global.css';
import ArticleRoot from './article-root';
import Articles from './pages/articles';
import Dashboard from './pages/dashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Landing />
      },
      {
        path: "artigos",
        element: <ArticleRoot />,
        children: [
          {
            index: true,
            element: <Articles />
          },
          {
            path: "sobrelicitacao",
            element: <AboutBidding />
          },
          {
            path: "sobredispensadelicitacao",
            element: <AboutBiddingDispatch />
          },
          {
            path: "sobrebot",
            element: <AboutBot />
          },
          {
            path: "sobrelicitabsb",
            element: <AboutLicitaBSB />
          }
        ]
      },
      {
        path: "sobrenos",
        element: <AboutUs />
      },
      {
        path: "licitacoes",
        element: <BiddingList />
      },
      {
        path: "licitacoes/:id",
        element: <BiddingPage />
      },
      {
        path: "graficos",
        element: <Dashboard />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <RouterProvider router={router} />
  </LocalizationProvider>,
);
