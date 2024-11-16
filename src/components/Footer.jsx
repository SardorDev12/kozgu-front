// Icons
import { FaTelegram } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="social-network">
        <form className="form">
          <input type="email" placeholder="Emailingizni yozing." required />
          <button type="submit">OBUNA</button>
        </form>
        <ul className="social-networks">
          <li>
            <a href="">
              <FaTelegram />
            </a>
          </li>
          <li>
            <a href="">
              <RiInstagramFill />
            </a>
          </li>
          <li>
            <a href="">
              <FaFacebook />
            </a>
          </li>
          <li>
            <a href="">
              <FaPinterest />
            </a>
          </li>
          <li>
            <a href="">
              <IoLogoYoutube />
            </a>
          </li>
        </ul>
      </div>
      <ul className="foot-nav_items">
        <li>
          <NavLink to="/">Asosiy </NavLink>
        </li>
        <li>
          <NavLink to="/articles">Maqolalar</NavLink>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
