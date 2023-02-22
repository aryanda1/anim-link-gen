// import "./App.css";
import { useState } from "react";
import Form from "./components/SearchAnime";
import ShowAnimeDetails from "./components/ShowAnime";
import ShowSearch from "./components/ShowSearch";
function App() {
  const [animeSearchRes, setAnimeSearchRes] = useState([]);
  const [uniqueId, setUniqueId] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const setSearchResultHandler = (data) => {
    setAnimeSearchRes([]);
    const results = data["results"].map((res, idx) => ({ ...res, index: idx }));
    setUniqueId(data["uniqueId"]);
    setAnimeSearchRes(results);
  };

  const reset = () => {
    setAnimeSearchRes([]);
    setCurrentId(null);
  }
  return (
    <div style={{ maxWidth: "40rem", margin: "0 auto", textAlign: "center" }}>
      <Form
        onSubmit={setSearchResultHandler}
        resetPrev={reset}
      />
      {animeSearchRes.length !== 0 && (
        <ShowSearch animes={animeSearchRes} setActiveAnime={setCurrentId} />
      )}
      {currentId !== null && (
        <ShowAnimeDetails anime={animeSearchRes[currentId]} unique={uniqueId} />
      )}
    </div>
  );
}

export default App;
