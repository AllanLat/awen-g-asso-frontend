import './App.css';

import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import { useEffect } from 'react';

function App() {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const navigate = useNavigate();

  // commande pour raz la session
  /* sessionStorage.clear(); */


  
  useEffect(() => {
    // Vérifier si l'utilisateur est connecté et s'il n'est pas déjà sur la page d'accueil
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return (
    
    <div className="App">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h1>Erreur 404</h1>} /> {/* à créer en page */}
        </Routes>
    </div>
  );
}

export default App;
