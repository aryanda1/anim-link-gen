import { useRef, useState } from "react";
import Paginate from "./Paginate";
import Titles from "./Titles";

export default function Form() {
  const ref = useRef();
  const [animeSearchRes, setAnimeSearchRes] = useState([]);
  const [searched, setSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [titlePerPage, seTtitlePerPage] = useState(5);
  const submitHandler = async () => {
    const an_name = ref.current.value;
    const response = await fetch("http://localhost:5000/search", {
      method: "POST",
      body: JSON.stringify({ an_name: an_name }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // const data = await response.json();
    // console.log(data);
    // const response = await fetch("http://localhost:5000/temp");
    const data = await response.json();
    const results = data["results"].map((res, idx) => ({ ...res, index: idx }));
    setAnimeSearchRes(results);
    setSearched(true);
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
      {searched && animeSearchRes.length === 0 && (
        <p>No anime found! Try Again</p>
      )}
      {animeSearchRes.length !== 0 && (
        <>
          <Titles animeDetails={currentDetails} loading={false} />
          <Paginate
            titlePerPage={titlePerPage}
            totalTitles={animeSearchRes.length}
            paginate={setCurrentPage}
          />
        </>
      )}
    </>
  );
}
