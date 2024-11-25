import { useEffect, useState } from "react";
import { getReq } from "../services/apiService";
import { FaCalendar } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import "../assets/styles/components/articlesGrid.scss";

const ArticlesGrid = ({ amount }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getReq("posts/");

        const sortedArticles = res.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        const limitedArticles = amount
          ? sortedArticles.slice(0, amount)
          : sortedArticles;

        setData(limitedArticles);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [amount]);

  return (
    <div className="container articles-grid">
      <h3 className="section-title">So'ngi maqolalar</h3>
      <div className="articles-grid__content">
        {data.map((article) => {
          return (
            <div className="article" key={article.id}>
              <div className="article-img">
                <p className="article-category"></p>
                <img src={article.article_pic} alt={article.title} />
              </div>
              <div className="article-cont">
                <h3 className="article-cont__title">{article.title}</h3>
                <p className="article-cont__text">
                  {article.content?.substring(0, 100) + "..."}
                </p>
                <div className="article-cont__metadata">
                  <div>
                    <FaCalendar />
                    <p className="published-date">
                      {article.published_at?.substring(0, 10)}
                    </p>
                  </div>
                  <div>
                    <IoTime />
                    <p className="read-duration">{article.read_time}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArticlesGrid;
