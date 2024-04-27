import CurrencyConvertor from "./components/currency-convertor";

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChangeRate, Dashboard, Login, Logout, ProtectedRoutes } from "./components/admins";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <>
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
    <div className="container">
      <BrowserRouter>
        <Routes>
          {/* Open URL's */}
          <Route path="/" element={<CurrencyConvertor />} />
          <Route path="/login" element={<Login />} />

          {/* Protected URL's */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/change-rate" element={<ChangeRate />} />
            <Route path="/logout" element={<Logout />} />
          </Route>

        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  </div>
    </>    
  );
}

export default App
