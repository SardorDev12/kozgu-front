import "../assets/styles/components/header.scss";

// Components
import { Link, NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import authService from "../services/authService";
import { useState, useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { getProfile } from "../services/apiService";

const Header = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    (async () => {
      const currentProfile = await getProfile();
      setCurrentUser(currentProfile);
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
            <div className="user-info">
              <div className="profile-pic">
                <img src={currentUser?.profile_pic_url} alt="" />
              </div>
              <FaSignOutAlt
                className="signout-btn"
                onClick={() => handleLogout()}
              />
            </div>
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
