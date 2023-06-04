import { useCallback, useEffect, useState } from "react";
import useHttp from "../hooks/usehttp";
import Card from "../UI/Card";
import Links from "./Links";

const ShowAnimeDetails = (props) => {
  const name = props.anime.gogoTitle;
  const uniqueId = props.unique;
  // console.log(name);
  const {
    error: err,
    isLoading: load,
    sendRequest: getTotalEpisodes,
  } = useHttp();
  const [eps, setEpisodes] = useState(null);
  const fetchEpisodes = useCallback(() => {
    const requestConfig = {
      url: `${process.env.api_base}/api/episodesCount`,
      method: "POST",
      body: { name: name, id: uniqueId },
      headers: {
        "Content-Type": "application/json",
      },
    };
    getTotalEpisodes(requestConfig, (data) => {
      setEpisodes(parseInt(data["epsNo"]));
    });
  }, [getTotalEpisodes, name, uniqueId]);
  useEffect(() => {
    fetchEpisodes();
  }, [fetchEpisodes]);

  let content;
  if (eps !== 0)
    content = (
      <>
        <p>
          <span className="sub-header">Title</span> : {props.anime.name}
        </p>
        <p>
          <span className="sub-header">Episdoes</span> : {eps}
        </p>
        <p>
          <span className="sub-header">Link</span> :{" "}
          <a
            href={`https://gogoanime.pe/category/${name}`}
            target="_blank"
            rel="noreferrer"
          >
            https://gogoanime.pe/category/{name}
          </a>
        </p>
        <Links uniqueId={uniqueId} />
      </>
    );
  if (load) content = <p>Loading...</p>;
  if (err)
    content = (
      <div className="center">
        <p className="error-text">{err}</p>
        <button onClick={fetchEpisodes} className="link">
          Try Again!
        </button>
      </div>
    );
  if (eps === 0) return null;
  return <Card header="Anime Details">{content}</Card>;
};

export default ShowAnimeDetails;
