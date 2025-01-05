import "../assets/styles/components/globalLayout.scss";

// Components
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const GlobalLayout = () => {
  return (
    <div className="global-layout">
      <header className="global-header">
        <Header />
      </header>
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="global-footer">
        <Footer />
      </footer>
    </div>
  );
};

export default GlobalLayout;
