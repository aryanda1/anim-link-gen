import { useRef } from "react";
import Card from "../UI/Card";

export default function Form({ resetPrev, onSubmit, searchAnime, loading }) {
  const ref = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    resetPrev();
    const an_name = ref.current.value;
    const requestConfig = {
      url: `${process.env.api_base}/api/search`,
      method: "POST",
      body: { an_name: an_name },
      headers: {
        "Content-Type": "application/json",
      },
    };
    searchAnime(requestConfig, onSubmit);
    // setSearched(true);
  };

  return (
    <Card header="Search Any Anime">
      <form>
        <div className="form-control">
          <label htmlFor="name">Enter Anime Name</label>
          <input type="text" ref={ref} id="name" />
        </div>
        <div className="form-actions">
          <button className="link" onClick={submitHandler} disabled={loading}>
            {loading ? "Searching" : "Submit"}
          </button>
        </div>
      </form>
    </Card>
  );
}
