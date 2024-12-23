import { useState, useEffect } from "react";
import { getReq } from "../services/apiService";

const Search = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getReq("categories/");
        setData(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container categs-search">
      <ul className="categories">
        <li className="all categ-item">Barchasi</li>

        {data.map((item, index) => (
          <li className="categ-item" key={index}>
            {item.name}
          </li>
        ))}
      </ul>
      <div className="search">
        <input
          className="search-input"
          type="text"
          placeholder="Maqolalarni izlang"
          required
        />
        <button className="search-btn" type="submit">
          IZLASH
        </button>
      </div>
    </div>
  );
};

export default Search;
