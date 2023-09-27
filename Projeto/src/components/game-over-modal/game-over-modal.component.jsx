import React from "react";
import { Footer } from "../index";

import "./game-over-modal.css";

function GameOverModal(props) {
  const { winner, handleReset, gameOver } = props;

  let frase = "";
  if (winner) {
    frase = `O JOGADOR '${winner}' VENCEU!`;
  } else {
    frase = "EMPATE";
  }

  return (
    <div className={gameOver ? "gameOver-panel" : "gameOver-panel hide"}>
      <header id="gameOver-header">
        <div>Jogo Terminado</div>
      </header>
      <div className="info" id="messageGameOver">
        <p>{frase}</p>
        <button type="button" id="btReplay" onClick={handleReset}>
          Jogar Novamente
        </button>
      </div>
      <footer id="gmFooter">
        <Footer />
      </footer>
    </div>
  );
}

export default GameOverModal;
