import { useState } from "react";
import Titles from "./Titles";
import Paginate from "./Paginate";
import Card from "../UI/Card";
const ShowSearch = ({ animes,setActiveAnime,error,loading,activeAnime }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const titlePerPage = 5;

  const lastTitleIdx = currentPage * titlePerPage;
  const firstTitleIdx = lastTitleIdx - titlePerPage;
  const currentDetails = animes.slice(firstTitleIdx, lastTitleIdx);
  return (
    <Card header='Anime Search Results'>
      <Titles
        animeDetails={currentDetails}
        setCurrentAnime={setActiveAnime}
        error={error}
        loading={loading}
        activeAnime={activeAnime}
      />
      <Paginate
        titlePerPage={titlePerPage}
        totalTitles={animes.length}
        paginate={setCurrentPage}
      />
    </Card>
  );
};

export default ShowSearch;
