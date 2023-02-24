import { useRef } from "react";
import Card from "../UI/Card";

export default function Form(props) {
  const ref = useRef();
  const { resetPrev, onSubmit,searchAnime  } = props;

  const submitHandler = async (e) => {
    e.preventDefault();
    resetPrev();
    const an_name = ref.current.value;
    const requestConfig = {
      url: "https://flask-production-9c0d.up.railway.app/api/search",
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
    <Card header='Search Any Anime'>
      <form>
        <div>
          <label htmlFor="name">Enter Anime Name</label>
          <input type="text" ref={ref} id="name" />
        </div>
        <button onClick={submitHandler}>Submit</button>
      </form>
    </Card>
  );
}
