// import "./App.css";
import { useState } from "react";
import Form from "./components/SearchAnime";
import ShowAnimeDetails from "./components/ShowAnime";
import ShowSearch from "./components/ShowSearch";
import useHttp from "./hooks/usehttp";
function App() {
  const { error, isLoading, sendRequest } = useHttp();
  const [animeSearchRes, setAnimeSearchRes] = useState([]);
  const [uniqueId, setUniqueId] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const setSearchResultHandler = (data) => {
    const results = data["results"].map((res, idx) => ({ ...res, index: idx }));
    setUniqueId(data["uniqueId"]);
    setAnimeSearchRes(results);
  };

  const reset = () => {
    setAnimeSearchRes([]);
    setCurrentId(null);
    setUniqueId(null);
  };
  return (
    <div className="app">
      <Form
        onSubmit={setSearchResultHandler}
        resetPrev={reset}
        searchAnime={sendRequest}
        loading={isLoading}
      />
      <ShowSearch
        animes={animeSearchRes}
        setActiveAnime={setCurrentId}
        error={error}
        loading={isLoading}
        activeAnime={currentId}
      />
      {currentId !== null && (
        <ShowAnimeDetails anime={animeSearchRes[currentId]} unique={uniqueId} />
      )}
    </div>
  );
}

export default App;
