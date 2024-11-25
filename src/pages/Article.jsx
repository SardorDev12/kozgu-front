import { useEffect, useState } from "react";
import { getReq } from "../services/apiService";
import { useParams } from "react-router-dom";

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

  return <div className="container">{article?.title}</div>;
};

export default Article;
