import Search from "../components/Search";
import TopArticle from "../components/TopArticle";
import "../assets/styles/pages/home.scss";
import ArticlesGrid from "../components/ArticlesGrid";

const Home = () => {
  return (
    <>
      <Search />
      <TopArticle />
      <ArticlesGrid amount={6} />
    </>
  );
};

export default Home;
