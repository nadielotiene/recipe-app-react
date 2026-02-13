import { useState } from 'react';
import './App.css'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import RecipeDetail from './components/RecipeDetail';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<RecipeDetail user={user} />} />
        <Route path="/new-recipe" element={<RecipeForm user={user} />} />
        <Route path="/edit/:id" element={<RecipeForm user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  )
}
