import { useEffect, useState } from "react";
import { getReq } from "../services/apiService";
import { useParams } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import "../assets/styles/pages/article.scss";

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getReq("posts/");
        if (!res) throw new Error("No data received");
        const post = res.find((post) => post.id === parseInt(id));
        if (!post) throw new Error("Article not found");
        setArticle(post);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="container loading">Loading...</div>;
  if (error) return <div className="container error">Error: {error}</div>;

  const formatContent = (content) => {
    return content.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <div className="container detailed_article">
      <div className="article-metadata">
        <NavLink to="/author/" className="author" title="Author Page">
          <FaPencil />
          {article?.author}
        </NavLink>
        <div className="published-date">
          <FaCalendar />
          {article?.published_at?.substring(0, 10)}
        </div>
        <div className="read-time">
          <IoTime />
          {article?.read_time} daqiqa
        </div>
      </div>
      <hr className="underline" />
      <h1 className="article-title">{article?.title}</h1>
      <div className="article-img">
        <img src={article?.article_pic} alt={article?.title} />
      </div>
      <div className="article-content">
        <p>{article?.content && formatContent(article.content)}</p>
      </div>
      <ul className="tags">
        {article?.tag?.map((item, index) => (
          <li className="tag-item" key={index}>
            #{item}
          </li>
        ))}
      </ul>
      <form className="article-comment">
        <h3 className="section-title">Izohlar</h3>
        <textarea
          className="commit-area"
          name="comment"
          id="comment"
        ></textarea>
        <button type="submit" className="submit-btn">
          JO'NATISH
        </button>
      </form>
    </div>
  );
};

export default Article;
