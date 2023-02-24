import styles from "./Titles.module.css";

const Titles = ({ animeDetails, setCurrentAnime,error,loading,activeAnime }) => {

  const handleAnimeClick = (e) => {
    const id = parseInt(e.target.getAttribute("data-index"));
    setCurrentAnime(id);
  };

  let content = <p>Search Any anime. To get Started</p>;
  if(loading) content = <p>Loading...</p>
  if(loading=== false && animeDetails.length === 0)//The default value for loading is null, so if nothing was searched it will display search line number 10, but if we search loading will become true and than false, so if no anime were found for that name, we will return below content
  content = <p>No Anime found. Try Again!</p>
  if(error) content = <p>{error}</p>
  if (animeDetails.length !== 0)
    content = (
        <ul className={styles.list}>
          {animeDetails.map((detail) => (
            <li
              data-index={detail.index}
              key={detail.index}
              onClick={handleAnimeClick}
              className={`${styles.li} ${
                detail.index === activeAnime ? styles.active : ""
              }`}
            >
              {`${detail.index}) ${detail.name}`}
            </li>
          ))}
        </ul>
    );
  // if (loading) content = <p>Loading...</p>;
  // if (error) content = <p>{error}</p>;
  return content;
};

export default Titles;
