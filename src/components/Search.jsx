import "../assets/styles/components/search.scss";

// Components
import { useState, useEffect } from "react";
import { getReq } from "../services/apiService";

const Search = () => {
  const [categories, setData] = useState([]);

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
    <div className="search-component">
      <div className="container categs-search">
        <ul className="categories">
          <li className="all categ-item">Barchasi</li>
          {categories
            .sort((a, b) => {
              if (a.name?.toLowerCase() === "top") return -1;
              if (b.name?.toLowerCase() === "top") return 1;
              return a.name?.localeCompare(b.name);
            })
            .map((item, index) => (
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
            name="query"
          />
          <button className="search-btn" type="submit">
            IZLASH
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
