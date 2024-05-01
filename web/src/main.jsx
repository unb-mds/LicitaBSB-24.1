import React from 'react'
import ReactDOM from 'react-dom/client'
import Landing from './pages/landing';
import AboutBidding from './pages/about-bidding';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './styles/global.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
