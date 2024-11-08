import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <div className="navbar">
        <Link to="/" className="logo">
          Feast
        </Link>

        <div>
          <Link to="/search">
            <img src="images/search_icon.png" alt="Search" className="search" />
          </Link>
          <Link to="/about" className="about">
            About
          </Link>
          <p className="login">Login</p>
          <p className="signup">Sign up</p>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
