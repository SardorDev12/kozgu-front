// Icons
import { FaTelegram } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import "../assets/styles/components/footer.scss";
const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <hr />
      <div className="container footer-content">
        <div className="social-network">
          <form className="form">
            <input
              name="obuna"
              type="email"
              placeholder="Emailingizni yozing"
              required
            />
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
        <div className="foot-nav">
          <div className="logo">
            <Link to={"/"}>KO'ZGU</Link>
          </div>
          <ul className="foot-nav_items">
            <li>
              <NavLink to="/">Asosiy </NavLink>
            </li>
            <li>
              <NavLink to="/articles">Maqolalar</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
