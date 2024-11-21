import { useEffect, useState } from "react";
import { getReq } from "../services/apiService";
import "../assets/styles/components/topArticle.scss";

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

  console.log(data);

  return (
    <article className="container top-article">
      <h3 className="section-h3">{data.category}</h3>
      <div className="article-content">
        <div className="text-div">
          <h2 className="article-title">{data.title}</h2>
          <div className="article-div">
            <div className="article-content__text">
              {data.content?.substring(0, 400) + "..."}
            </div>
            <button type="button" className="readmore-btn">
              Read More
            </button>
          </div>
          <div className="article-metadata">
            <div className="author">{data.author}</div>
            <div className="published-date">
              {data.published_at?.substring(0, 10)}
            </div>
            <div className="read-time">{data.read_time}</div>
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