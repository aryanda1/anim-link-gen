import { useState } from "react";
import styles from "./Titles.module.css";
import Paginate from "./Paginate";

const Titles = ({
  animeDetails,
  loading,
  titlePerPage,
  totalTitles,
  paginate,
}) => {
  const [activeId, setActiveId] = useState();

  const handleAnimeClick = (e) => {
    setActiveId(parseInt(e.target.getAttribute("data-index")));
  };
  //   console.log(typeof activeId);

  let content = <h2>No anime found! Try Again</h2>;
  if (animeDetails.length !== 0)
    content = (
      <>
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
        <Paginate
          titlePerPage={titlePerPage}
          totalTitles={totalTitles}
          paginate={paginate}
        />
      </>
    );
  if (loading) content = <p>Loading...</p>;

  return content;
};

export default Titles;
