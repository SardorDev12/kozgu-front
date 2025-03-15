import React from "react";
import { useState, useEffect } from "react";
import { getProfile } from "../services/apiService";

// Quill
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

const Write = () => {
  const { quill, quillRef } = useQuill();
  const [user, setUser] = useState(null);
  const [content, setContent] = useState({
    title: "",
    content: "",
    category: "",
    tag: [],
    read_time: 0,
    status: "draft",
    article_pic: "",
  });
  console.log(content);

  useEffect(() => {
    (async () => {
      const user = await getProfile();
      setUser(user);
    })();
  }, []);
  return (
    <div className="container write-page">
      <form className="write-article">
        <div className="article-title__div">
          <label htmlFor="articleTitle">Title</label>
          <input type="text" name="articleTitle" id="articleTitle" />
        </div>
        <div className="article-img__div">
          <input type="file" accept="image/*" />
        </div>
      </form>
      {user ? (
        <div style={{ width: 500, height: 300 }}>
          <div ref={quillRef} />
        </div>
      ) : (
        <p>Login</p>
      )}
    </div>
  );
};

export default Write;
