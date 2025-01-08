import React from "react";
import { useState, useEffect } from "react";
import { getProfile } from "../services/apiService";

// Quill
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

const Write = () => {
  const { quill, quillRef } = useQuill();
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const user = await getProfile();
      setUser(user);
    })();
  }, []);
  return (
    <div className="container write-page">
      {user && (
        <div style={{ width: 500, height: 300 }}>
          <div ref={quillRef} />
        </div>
      )}
      <p>Login</p>
    </div>
  );
};

export default Write;
