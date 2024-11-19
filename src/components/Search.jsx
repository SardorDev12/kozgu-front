import { useEffect } from "react";
import { useData } from "../layouts/GlobalContext";

const Search = () => {
  const { data, fetchData } = useData([]);

  useEffect(() => {
    fetchData("categories");
  }, []);

  const categories = data.categories || [];

  return (
    <div className="container categs-search">
      <ul className="categories">
        <li className="all categ-item">Barchasi</li>

        {categories.map((item, index) => (
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
