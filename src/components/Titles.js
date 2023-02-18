import { useState } from "react";
import styles from "./Titles.module.css";

const Titles = ({ animeDetails, loading }) => {
  const [activeId, setActiveId] = useState();

  const handleAnimeClick = (e) => {
    setActiveId(parseInt(e.target.getAttribute("data-index")));
    console.log(e.target.getAttribute("data-index"));
  };
  //   console.log(typeof activeId);

  if (loading) return <h2>Loading...</h2>;
  return (
    <ul className={styles.list}>
      {animeDetails.map((detail) => (
        <li
          data-index={detail.index}
          key={detail.index}
          onClick={handleAnimeClick}
          className={`${styles.li} ${
            detail.index === activeId ? styles.active : ""
          }`}
        >
          {detail.name}
        </li>
      ))}
    </ul>
  );
};

export default Titles;
