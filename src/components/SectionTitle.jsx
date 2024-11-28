import { Link } from "react-router-dom";

const SectionTitle = ({ addres, title }) => {
  return (
    <h3>
      <Link className="section-title" to={`/${addres}`}>
        {title}
      </Link>
    </h3>
  );
};

export default SectionTitle;
