import "../assets/styles/pages/articles.scss";

// Components
import Search from "../components/Search";
import { getReq } from "../services/apiService";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaCalendar } from "react-icons/fa";
import { IoTime } from "react-icons/io5";

const Articles = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getReq("posts/");
        setData(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const groupedPosts = data.reduce((acc, post) => {
    const category = post.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(post);
    return acc;
  }, {});

  return (
    <div className="container articles-page">
      <Search />
      {Object.keys(groupedPosts).map((category) => (
        <div key={category} className="category-section">
          <h2 className="category-section__title">{category}</h2>
          <div className="posts-grid">
            {groupedPosts[category].map((article) => (
              <Link
                className="article"
                key={article.id}
                to={`/articles/${article.id}`}
              >
                <div className="article-img">
                  <p className="article-category">{article.category}</p>
                  <img src={article.article_pic} alt={article.title} />
                </div>
                <div className="article-cont">
                  <h3 className="article-cont__title">{article.title}</h3>
                  <p className="article-cont__text">
                    {article.content?.substring(0, 200) + "..."}
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
                      <p className="read-duration">
                        {article.read_time} daqiqa
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Articles;
