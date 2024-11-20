import { useEffect, useState } from "react";
import { getReq } from "../services/apiService";

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
      <h3 className="section-h3">{data.title}</h3>
      <div className="div">
        <div className="text-div">
          <h3 className="article-h3"></h3>
          <div className="article-div">
            <div className="article-content__text">{data.content}</div>
            <button type="button" className="readmore-btn">
              Read More
            </button>
          </div>
          <div className="article-metadata">
            <div className="author">{data.author}</div>
            <div className="published-date">{data.created_date}</div>
            <div className="read-time"></div>
          </div>
        </div>
        <div className="image-div">
          <img src="" alt="article-image" />
        </div>
      </div>
    </article>
  );
};

export default TopArticle;
