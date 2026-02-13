import { Link } from 'react-router-dom';

export default function Navbar({ user, setUser }) {

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <nav className="nav">
      <Link to="/"><h1>🍳 My Recipes</h1></Link>
      {user ? (
        <div>
          <p>Hello, {user.username}!</p>
          <Link to="/new-recipe">Create Recipe</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  )
}