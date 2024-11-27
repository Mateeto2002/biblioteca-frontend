import React from "react";
import { RegisterView } from  './components/register/RegisterView'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { LoginView } from './components/login/LoginView'
import { Home } from "./pages/Home";
import { CrearLibroView } from "./components/admin/CrearLibroView";
import Dashboard from "./components/admin/Dashboard";
import { ProtectedRoute } from "./helpers/ProtectedRoute";

const App = () => {

  return(
    <Router>

      <Routes>
        <Route path="/admin" element={ <Dashboard /> } /> 

        
        <Route path='/home' element={<ProtectedRoute> <Home /> </ProtectedRoute>  }  />
        
        
        
        
        <Route path='/register' element= {<RegisterView />} /> 
        <Route path="/" element={ <LoginView /> }  />
      </Routes>

      
    </Router>
  )
}



export { App };
