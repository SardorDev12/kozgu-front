import "../assets/styles/components/header.scss";

// Components
import { Link, NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import authService from "../services/authService";
import { useState, useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    (async () => {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setCurrentUser(currentUser);
      }
    })();
  }, []);

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  return (
    <header className="header" id="header">
      <div className="container header-content">
        <div className="logo">
          <Link to="/">KO'ZGU</Link>
        </div>
        <nav className="navbar">
          <ul className="items">
            <li>
              <NavLink className={"nav-item"} to="/">
                Bosh sahifa
              </NavLink>
            </li>
            <li>
              <NavLink className={"nav-item"} to="/articles">
                Maqolalar
              </NavLink>
            </li>
          </ul>

          {currentUser ? (
            <NavLink to={"/profile"} className="user-info">
              <span className="username">
                <FaUser /> {currentUser?.username}
              </span>
              <FaSignOutAlt
                className="signout-btn"
                onClick={() => handleLogout()}
              />
            </NavLink>
          ) : (
            <Link to={"/login"}>
              <button className="login-btn" type="button">
                <FaUser />
                KIRISH
              </button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
