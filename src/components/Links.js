import useHttp from "../hooks/usehttp";
import { useRef, useState } from "react";
const Links = ({ uniqueId }) => {
  const epRef = useRef();
  const [epsLink, setEpsLink] = useState(null);
  const { error: err2, isLoading: load2, sendRequest: getdownload } = useHttp();
  const submitHandler = (e) => {
    e.preventDefault();
    const episode = parseInt(epRef.current.value);
    setEpsLink(null);
    const requestConfig = {
      url: "https://flask-production-9c0d.up.railway.app/api/getEps",
      method: "POST",
      body: { ep: episode, id: uniqueId },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
    };
    getdownload(requestConfig, (data) => {
      setEpsLink(data["download"]);
    });
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <label>Enter Episode number</label>
        <input type="number" ref={epRef} />
        <button>Get</button>
      </form>
      {epsLink !== null && (
        <a href={epsLink} target="_blank" rel="noreferrer">
          Open
        </a>
      )}
    </>
  );
};

export default Links;
