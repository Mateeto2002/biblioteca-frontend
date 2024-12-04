import React from "react";
import { RegisterView } from  './components/register/RegisterView'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { LoginView } from './components/login/LoginView'
import LibroDetails, { Home } from "./pages/Home";

import { ProtectedRoute } from "./helpers/ProtectedRoute";
import { Admin } from './pages/Admin'
import { MisPrestamos } from "./pages/MisPrestamos";

const App = () => {

  return(
    <Router>

      <Routes>
        <Route path="/admin" element={ <Admin /> } /> 
        <Route path="/user/prestamos" element={ <MisPrestamos /> } />
        <Route path='/home' element={<ProtectedRoute> <Home /> </ProtectedRoute>  }  />
        
        <Route path='/libro/:idLibro' element= {<LibroDetails />} /> 
        
        
        <Route path='/register' element= {<RegisterView />} /> 
        <Route path="/" element={ <LoginView /> }  />
      </Routes>

      
    </Router>
  )
}



export { App };
