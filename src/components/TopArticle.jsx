import { useEffect, useState } from "react";
import { getReq } from "../services/apiService";
import "../assets/styles/components/topArticle.scss";
import { FaPencil } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import SectionTitle from "../components/SectionTitle.jsx";

const TopArticle = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getReq("posts/");
        const topPost = res.find((post) => post.category == "TOP");
        setData(topPost);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <article className="container top-article">
      <SectionTitle addres="articles" title={data.category} />
      <div className="article-content">
        <div className="text-div">
          <h2 className="article-title">{data.title}</h2>
          <div className="article-div">
            <div className="article-content__text">
              {data.content?.substring(0, 400) + "..."}
            </div>
            <Link className="readmore-btn" to={`/articles/${data.id}`}>
              Read More
            </Link>
          </div>
          <div className="article-metadata">
            <NavLink to="/author/" className="author" title="Author Page">
              <FaPencil />
              {data.author}
            </NavLink>
            <div className="published-date">
              <FaCalendar />
              {data.published_at?.substring(0, 10)}
            </div>
            <div className="read-time">
              <IoTime />
              {data.read_time} daqiqa
            </div>
          </div>
        </div>
        <div className="image-div">
          <img src={data.article_pic} alt="article-image" />
        </div>
      </div>
    </article>
  );
};

export default TopArticle;
