import React from "react";
import "./square.css";

const Square = (props) => {
  const { squareClassName, player, onClick, isDisabled } = props;

  const squareStyle = {
    color: player === "X" ? "red" : "blue",
  };

  return (
    <button
      className={squareClassName}
      style={squareStyle}
      onClick={onClick}
      disabled={isDisabled || player !== null}
    >
      {player}
    </button>
  );
};

export default Square;
