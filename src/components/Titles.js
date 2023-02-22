import { useState } from "react";
import styles from "./Titles.module.css";

const Titles = ({ animeDetails, setCurrentAnime }) => {
  const [activeId, setActiveId] = useState();

  const handleAnimeClick = (e) => {
    const id = parseInt(e.target.getAttribute("data-index"));
    setActiveId(id);
    setCurrentAnime(id);
  };

  let content = <h2>No anime found! Try Again</h2>;
  if (animeDetails.length !== 0)
    content = (
      <>
      <h3>Anime Search Results</h3>
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
      </>
    );
  // if (loading) content = <p>Loading...</p>;
  // if (error) content = <p>{error}</p>;
  return content;
};

export default Titles;
