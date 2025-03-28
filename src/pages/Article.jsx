import "../assets/styles/pages/article.scss";

// Components
import { useEffect, useState } from "react";
import { getReq, postReq } from "../services/apiService";
import { useParams } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { FaUser } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { FaReply } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";

const Article = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [comment, setComment] = useState(null);

  const [comments, setComments] = useState(null);
  const [commentError, setCommentError] = useState(false);
  console.log(article);
  const handleSubmitComment = async () => {
    if (!comment || !currentUser) {
      setCommentError("Comment cannot be empty and user must be logged in.");
      return;
    }

    try {
      await postReq(`comments/create/`, {
        content: comment,
        post: article?.id,
        user: currentUser?.id,
      });
      setComment();
      fetchComments();
    } catch (error) {
      console.log(error);
      setCommentError("Failed to post the comment. Please try again.");
    }
  };

  const fetchArticles = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getReq("posts/");
      if (!res) throw new Error("No data received");
      const post = res.find((post) => post?.id === parseInt(id));
      if (!post) throw new Error("Article not found");
      setArticle(post);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await getReq(`posts/${id}/comments/`);
      if (!res) throw new Error("No comments received");
      setComments(res);
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    (async () => {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setCurrentUser(currentUser);
      }
    })([]);
    fetchArticles();
    fetchComments();
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
    <div className="container article-page">
      <p type="button" className="back-btn" onClick={() => navigate(-1)}>
        <IoIosArrowBack />
        <span>Orqaga</span>
      </p>
      <div className="detailed_article">
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
        <ul className="article-tags categories">
          {article?.tag?.map((item, index) => (
            <li className="categ-item" key={index}>
              #{item}
            </li>
          ))}
        </ul>
        <form
          className="article-comment"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitComment();
          }}
        >
          {currentUser ? (
            <>
              <textarea
                className="commit-area"
                name="comment"
                id="comment"
                onChange={(e) => setComment(e.target.value)}
                value={comment || ""}
                placeholder="Izoxlaringizni shu yerda qoldiring..."
              ></textarea>
              <button type="submit" className="submit-btn">
                JO'NATISH
              </button>
            </>
          ) : (
            <div className="signin__cta">
              <NavLink to="/login/">Sign in to comment</NavLink>
            </div>
          )}
          {commentError ? (
            <div>Error: {commentError}</div>
          ) : (
            <ul className="article-comments">
              <h3 className="section-title">Izohlar</h3>
              {comments?.map((comment) => (
                <li className="article-comment" key={comment.id}>
                  <span className="comment-author">
                    <FaUser />
                    {comment?.username}
                  </span>
                  <span className="comment-text">{comment?.content}</span>

                  <span className="comment-actions">
                    <AiFillLike className="comment like" />
                    <AiFillDislike className="comment dislike" />
                    <FaReply className="comment reply" />
                    {comment?.user == currentUser?.id ? (
                      <MdEdit className="comment edit" />
                    ) : (
                      ""
                    )}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
    </div>
  );
};

export default Article;
