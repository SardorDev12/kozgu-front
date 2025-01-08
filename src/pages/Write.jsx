import { useEffect, useState } from "react";
import authService from "../services/authService";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Write = () => {
  const [user, setUser] = useState(null);
  const [content, setContent] = useState(null);

  const toolbarOptions = [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["link", "image"],
    ["clean"],
  ];

  const handleContentChange = (val) => {
    setContent(val);
  };

  useEffect(() => {
    (async () => {
      const userLoggedIn = authService.getCurrentUser();
      setUser(userLoggedIn);
    })();
  }, []);
  return (
    <div className="container write-page">
      {user ? (
        <div>
          <h1>Write Your Article</h1>
          <ReactQuill
            value={content}
            onChange={handleContentChange}
            modules={{ toolbar: toolbarOptions }}
          />
          <button>Publish</button>
        </div>
      ) : (
        <div className="login">You need to log in</div>
      )}
    </div>
  );
};

export default Write;
