import React from 'react'
import ReactDOM from 'react-dom/client'
import Landing from './pages/landing';
import AboutBidding from './pages/about-bidding';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './styles/global.css'
import AboutUs from './pages/about-us';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />
  },
  {
    path: "/sobrelicitacao",
    element: <AboutBidding/>
  },
  {
    path: "/sobrenos",
    element: <AboutUs/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
