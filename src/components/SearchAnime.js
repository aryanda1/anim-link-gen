import { useRef, useState } from "react";
import Paginate from "./Paginate";
import Titles from "./Titles";
import useHttp from "../hooks/usehttp";

export default function Form() {
  const ref = useRef();
  const [animeSearchRes, setAnimeSearchRes] = useState([]);
  const [searched, setSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [titlePerPage, seTtitlePerPage] = useState(5);
  const { error, isLoading, sendRequest } = useHttp();

  const setDetails = (data) => {
    const results = data["results"].map((res, idx) => ({ ...res, index: idx }));
    setAnimeSearchRes(results);
  };

  const submitHandler = async () => {
    setSearched(true);
    const an_name = ref.current.value;
    const requestConfig = {
      url: "http://localhost:5000/search",
      method: "POST",
      body: { an_name: an_name },
      headers: {
        "Content-Type": "application/json",
      },
    };
    sendRequest(requestConfig, setDetails);
  };

  const lastTitleIdx = currentPage * titlePerPage;
  const firstTitleIdx = lastTitleIdx - titlePerPage;
  const currentDetails = animeSearchRes.slice(firstTitleIdx, lastTitleIdx);
  // console.log(animeSearchRes);
  return (
    <>
      <div>
        <label htmlFor="name">Enter Anime Name</label>
        <input type="text" ref={ref} id="name" />
      </div>
      <button onClick={submitHandler}>Submit</button>
      {searched && (
        <Titles
          animeDetails={currentDetails}
          loading={isLoading}
          titlePerPage={titlePerPage}
          totalTitles={animeSearchRes.length}
          paginate={setCurrentPage}
          error={error}
        />
      )}
    </>
  );
}
