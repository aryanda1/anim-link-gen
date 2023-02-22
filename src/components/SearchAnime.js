import { useRef, useState } from "react";
import Titles from "./Titles";
import useHttp from "../hooks/usehttp";
import ShowAnimeDetails from "./ShowAnime";

export default function Form(props) {
  const ref = useRef();
  const { error, isLoading, sendRequest } = useHttp();

  const submitHandler = async (e) => {
    e.preventDefault();
    props.resetPrev();
    const an_name = ref.current.value;
    const requestConfig = {
      url: "https://flask-production-9c0d.up.railway.app/api/search",
      method: "POST",
      body: { an_name: an_name },
      headers: {
        "Content-Type": "application/json",
      },
    };
    sendRequest(requestConfig, props.onSubmit);
    // setSearched(true);
  };

  return (
    <form>
      <div>
        <label htmlFor="name">Enter Anime Name</label>
        <input type="text" ref={ref} id="name" />
      </div>
      <button onClick={submitHandler}>Submit</button>
    </form>
  );
}
