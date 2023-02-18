import { useState } from "react";
import styles from "./Paginate.module.css";

const Paginate = ({ titlePerPage, totalTitles, paginate }) => {
  const pageNumbers = [];
  const [activeId, setActiveId] = useState();
  for (let i = 1; i <= Math.ceil(totalTitles / titlePerPage); i++)
    pageNumbers.push(i);

  const clickHandler = () => {};
  return (
    <ul className={styles.ul}>
      {pageNumbers.map((number) => (
        <li
          key={number}
          onClick={() => {
            setActiveId(number);
            paginate(number);
          }}
          className={`${number === activeId ? styles.active : ""}`}
        >
          {number}
        </li>
      ))}
    </ul>
  );
};

export default Paginate;