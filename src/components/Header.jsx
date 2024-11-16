import { NavLink } from "react-router-dom";
import "../assets/styles/components/header.scss";

const Header = () => {
  return (
    <header className=" header" id="header">
      <div className="container header-content">
        <div className="logo">
          <a href="#header">KO'ZGU</a>
        </div>
        <nav className="navbar">
          <ul className="items">
            <li>
              <NavLink to="/">Bosh sahifa</NavLink>
            </li>
            <li>
              <NavLink to="/articles">Maqolalar</NavLink>
            </li>
          </ul>
          <button className="login-btn" type="button">
            KIRISH
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
