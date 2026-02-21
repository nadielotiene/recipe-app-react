import { Link } from 'react-router-dom';

export default function Navbar({ user, setUser }) {

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <div className="body">
      <nav className="nav">
        <div className="nav-content">
          <Link className="nav-logo" to="/"><h1 className="nav-logo">🍳 My Recipes</h1></Link>
          {user ? (
            <div className="nav-links">
              <Link className="nav-btn nav-btn-primary" to="/new-recipe">Create Recipe</Link>
              <p className="nav-username">Hello, {user.username}!</p>
              <button className="nav-btn nav-btn-secondary" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <Link className="nav-btn nav-btn-secondary" to="/login">Login</Link>
          )}
        </div>
      </nav>
    </div>
  )
}