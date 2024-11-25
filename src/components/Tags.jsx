import { useState, useEffect } from "react";
import { getReq } from "../services/apiService";

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
    <div className="container categs-search tags">
      <ul className="categories">
        <li className="all categ-item">Barchasi</li>

        {data.map((item, index) => (
          <li className="categ-item" key={index}>
            #{item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tags;
