import "../assets/styles/components/header.scss";

// Components
import { Link, NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import authService from "../services/authService";
import { useState, useEffect, useRef } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { getProfile } from "../services/apiService";
import { FaHouseUser } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";
import { PiPenFill } from "react-icons/pi";

const Header = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const modalRef = useRef(null);

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

  const toggleModal = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const closeModal = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="header" id="header">
      <div className="container header-content">
        <div className="logo">
          <Link to="/">KO'ZGU</Link>
        </div>
        <nav className="navbar">
          <ul className="items">
            <NavLink className={"nav-item"} to="/">
              Bosh sahifa
            </NavLink>
            <NavLink className={"nav-item"} to="/articles">
              Maqolalar
            </NavLink>
            <NavLink className={"nav-item write-page__btn"} to="/write">
              Maqola yozish
            </NavLink>
          </ul>

          {currentUser ? (
            <div className="user-info">
              <div className="profile-pic">
                <img
                  onClick={toggleModal}
                  className="profile-pic_img"
                  src={currentUser?.profile_pic_url}
                  alt=""
                />
              </div>
              {isMenuOpen && (
                <div ref={modalRef} className="menu">
                  <div className="menu-header">
                    <h4 className="menu-title">
                      <FaUser />
                      {`${currentUser?.first_name} ${currentUser?.second_name}`}
                    </h4>
                    <IoCloseCircle
                      onClick={closeModal}
                      className="menu-close"
                    />
                  </div>
                  <ul className="menu-items">
                    <NavLink
                      to="/"
                      onClick={closeModal}
                      className="menu-item my-profile"
                    >
                      <IoHome className="my-profile__icon" />
                      Bosh sahifa
                    </NavLink>
                    <NavLink
                      to="/profile"
                      onClick={closeModal}
                      className="menu-item my-profile"
                    >
                      <FaHouseUser className="my-profile__icon" />
                      Sahifam
                    </NavLink>
                    <NavLink
                      to="/write"
                      onClick={closeModal}
                      className="menu-item my-profile"
                    >
                      <PiPenFill className="my-profile__icon" />
                      Maqola yozish
                    </NavLink>
                    <NavLink
                      onClick={() => handleLogout()}
                      className="menu-item logout"
                    >
                      <FaSignOutAlt className="signout-btn" />
                      Chiqish
                    </NavLink>
                  </ul>
                </div>
              )}
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
