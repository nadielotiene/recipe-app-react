import { useState } from 'react';
import './style.css'; 
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import RecipeDetail from './components/RecipeDetail';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';

function AppContent() {
  const location = useLocation();
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
});

return (
  <>
    {location.pathname !== "/login" && <Navbar user={user} setUser={setUser} />}
    <Routes>
      <Route path="/" element={<RecipeList />} />
      <Route path="/recipe/:id" element={<RecipeDetail user={user} />} />
      <Route path="/new-recipe" element={<RecipeForm user={user} />} />
      <Route path="/edit/:id" element={<RecipeForm user={user} />} />
      <Route path="/login" element={<Login setUser={setUser} />} />
    </Routes>
  </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
