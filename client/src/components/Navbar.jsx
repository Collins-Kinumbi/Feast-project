function Navbar() {
  return (
    <div className="navbar">
      <p className="logo">Feast</p>

      <div>
        <img src="images/search_icon.png" alt="Search" className="search" />
        <p className="about">About</p>
        <p className="login">Login</p>
        <p className="signup">Sign up</p>
      </div>
    </div>
  );
}

export default Navbar;
