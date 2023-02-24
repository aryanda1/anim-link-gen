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
      url: "https://flask-production-9c0d.up.railway.app/api/episodesCount",
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
        <p>Title : {props.anime.name}</p>
        <p>Episdoes : {eps}</p>
        <p>
          Link :{" "}
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
  if (err) content = <p>{err}</p>;
  if (eps === 0) return null;
  return <Card header='Anime Details'>{content}</Card>;
};

export default ShowAnimeDetails;
