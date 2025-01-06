import { useState, useEffect } from "react";
import { getReq } from "../services/apiService";
import "../assets/styles/components/tags.scss";

const Tags = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getReq("tags/");
        setData(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <ul className="container tags">
      <li className="all categ-item">Barcha teglar</li>

      {data.map((item, index) => (
        <li className="categ-item" key={index}>
          #{item.name}
        </li>
      ))}
    </ul>
  );
};

export default Tags;
