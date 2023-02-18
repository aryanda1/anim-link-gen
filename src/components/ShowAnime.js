import { useCallback, useEffect, useState } from "react";
import useHttp from "../hooks/usehttp";
import Card from "../UI/Card";
const ShowAnimeDetails = (props) => {
  const name = props.anime.gogoTitle;
  console.log(name);
  const { error, isLoading, sendRequest } = useHttp();
  const [eps, setEpisodes] = useState(0);
  const fetchEpisodes = useCallback(() => {
    const requestConfig = {
      url: "http://localhost:5000/episodesCount",
      method: "POST",
      body: { name: name },
      headers: {
        "Content-Type": "application/json",
      },
    };
    sendRequest(requestConfig, (data) => {
      setEpisodes(parseInt(data["epsNo"]));
    });
  }, [sendRequest, name]);
  useEffect(() => {
    fetchEpisodes();
  }, [fetchEpisodes]);

  if (eps === 0) return null;
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
      </>
    );
  if (isLoading) content = <p>Loading...</p>;
  if (error) content = <p>{error}</p>;
  return <Card>{content}</Card>;
};

export default ShowAnimeDetails;
