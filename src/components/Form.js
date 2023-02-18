import { useRef, useState } from "react";

export default function Form() {
  const ref = useRef();
  const [animeSearchRes, setAnimeSearchRes] = useState([]);
  const [searched, setSearched] = useState(false);
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
    setAnimeSearchRes(data["results"]);
    setSearched(true);
  };

  const handleAnimeClick = (e) => {
    console.log(e.target.getAttribute("data-index"));
  };

  return (
    <>
      <label>Enter Anime Name</label>
      <input type="text" ref={ref} />
      <button onClick={submitHandler}>Submit</button>
      {searched && animeSearchRes.length === 0 && (
        <p>No anime found! Try Again</p>
      )}
      {animeSearchRes.length !== 0 && (
        <ul>
          {animeSearchRes.map((anime, idx) => (
            <li key={idx} data-index={idx} onClick={handleAnimeClick}>
              {anime.name}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
