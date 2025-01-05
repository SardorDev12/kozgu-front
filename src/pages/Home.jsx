import TopArticle from "../components/TopArticle";
import "../assets/styles/pages/home.scss";
import ArticlesGrid from "../components/ArticlesGrid";
import Tags from "../components/Tags";
import Search from "../components/Search";
const Home = () => {
  return (
    <>
      <Search />
      <TopArticle />
      <ArticlesGrid amount={8} />
      <Tags />
    </>
  );
};

export default Home;
