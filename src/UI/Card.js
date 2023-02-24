import styles from "./Card.module.css";
const Card = (props) => {
  return (
    <div className={`${styles.card} ${props.className}`}>
      <h3>{props.header}</h3>
      {props.children}
      </div>
  );
};

export default Card;
