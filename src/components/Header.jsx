import { Link, NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import "../assets/styles/components/header.scss";
import { useAuth } from "../services/authService";

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <header className=" header" id="header">
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
          {user ? (
            <div className="user-info">
              <span>{user.username}</span>
              <button className="logout-btn" onClick={logout}>
                Log Out
              </button>
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
