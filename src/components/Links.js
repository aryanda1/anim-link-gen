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
      url: `${process.env.REACT_APP_API}/api/getEps`,
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
        <div className="form-control">
          <label>Enter Episode number</label>
          <input type="number" ref={epRef} />
        </div>
        <div className="form-actions">
          <button className="link" disabled={load2}>
            {load2 ? "Wait" : "Get"}
          </button>
        </div>
      </form>
      {err2 && <p className="error-text center">{err2}</p>}
      {epsLink !== null && (
        <div className="link-wrapper">
          <a className="link" href={epsLink} target="_blank" rel="noreferrer">
            Open
          </a>
        </div>
      )}
    </>
  );
};

export default Links;
