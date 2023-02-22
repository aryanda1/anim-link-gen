import { useState } from "react";
import Titles from "./Titles";
import Paginate from "./Paginate";
const ShowSearch = ({ animes,setActiveAnime }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const titlePerPage = 5;

  const lastTitleIdx = currentPage * titlePerPage;
  const firstTitleIdx = lastTitleIdx - titlePerPage;
  const currentDetails = animes.slice(firstTitleIdx, lastTitleIdx);
  return (
    <>
      <Titles
        animeDetails={currentDetails}
        setCurrentAnime={setActiveAnime}
      />
      <Paginate
        titlePerPage={titlePerPage}
        totalTitles={animes.length}
        paginate={setCurrentPage}
      />
    </>
  );
};

export default ShowSearch;
