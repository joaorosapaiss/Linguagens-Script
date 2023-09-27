import React, { useEffect, useState } from "react";
import { calculateWinner, winnerFullBoard } from "../../helpers/winner";
import { boardIsFull } from "../../helpers/fullBoard";
import "./game-panel.css";
import Board from "../board/board.component";

const GamePanel = (props) => {
  const {
    player1Name,
    player2Name,
    player1Symbol,
    player2Symbol,
    gameStarted,
    gameOver,
    setGameOver,
    setWinner,
    level,
    replay,
  } = props;

  const [boards, setBoards] = useState(Array(9).fill(Array(9).fill(null)));
  const [nextBoard, setNextBoard] = useState(Math.floor(Math.random() * 9));
  const [xIsNext, setXIsNext] = useState(Math.round(Math.random()) === 1);
  const [winners, setWinners] = useState(Array(9).fill(null));
  const [timerJ1, setTimerJ1] = useState(40);
  const [timerJ2, setTimerJ2] = useState(40);

  useEffect(() => {
    let timerId = undefined;
    if (level === "2" && gameStarted) {
      if (
        (xIsNext && player1Symbol === "X") ||
        (!xIsNext && player1Symbol === "O")
      ) {
        timerId = setInterval(() => {
          setTimerJ1((previousState) => {
            const nextTimer = previousState - 1;
            if (nextTimer === 0) {
              setWinner(player1Symbol === "X" ? "O" : "X");
              setGameOver(true);
              clearInterval(timerId);
            }
            return nextTimer;
          });
        }, 1000);
      } else {
        timerId = setInterval(() => {
          setTimerJ2((previousState) => {
            const nextTimer = previousState - 1;
            if (nextTimer === 0) {
              setWinner(player2Symbol === "X" ? "O" : "X");
              setGameOver(true);
              clearInterval(timerId);
            }
            return nextTimer;
          });
        }, 1000);
      }
      if (gameOver) {
        clearInterval(timerId);
      }
    } else {
      setTimerJ1(40);
      setTimerJ2(40);
    }
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [gameStarted, setGameOver, setWinner, xIsNext, gameOver, level]);

  useEffect(() => {
    if (level === "1") {
      if (
        (xIsNext && player2Symbol === "X") ||
        (!xIsNext && player2Symbol === "O")
      ) {
        const availableSquares = [];
        for (let i = 0; i < boards[nextBoard].length; i++) {
          if (boards[nextBoard][i] === null) {
            availableSquares.push(i);
          }
        }

        if (availableSquares.length > 0) {
          setTimeout(() => {
            const randomIndex = Math.floor(
              Math.random() * availableSquares.length
            );
            const randomSquare = availableSquares[randomIndex];

            const newBoards = [...boards];
            const newBoard = [...newBoards[nextBoard]];
            const newWinners = [...winners];

            setNextBoard(randomSquare);

            newBoard[randomSquare] = xIsNext ? "X" : "O";
            newBoards[nextBoard] = newBoard;
            setBoards(newBoards);

            setXIsNext(!xIsNext);

            if (boardIsFull(newBoard)) {
              newWinners[nextBoard] = "E";
              setWinners(newWinners);
            }

            const miniVencedor = calculateWinner(newBoard);
            if (miniVencedor) {
              newWinners[nextBoard] = miniVencedor;
              setWinners(newWinners);
            }
          }, 500);
        }
      }
    }
  }, [xIsNext, boards, level, nextBoard, player2Symbol, winners]);

  const handleSquareClick = (boardIndex, squareIndex) => {
    const newBoards = [...boards];
    const newBoard = [...newBoards[boardIndex]];
    const newWinners = [...winners];

    setNextBoard(squareIndex);

    newBoard[squareIndex] = xIsNext ? "X" : "O";
    newBoards[boardIndex] = newBoard;
    setBoards(newBoards);

    setXIsNext(!xIsNext);

    if (boardIsFull(newBoard)) {
      newWinners[boardIndex] = "E";
      setWinners(newWinners);
    }

    const miniVencedor = calculateWinner(newBoard);
    if (miniVencedor) {
      newWinners[boardIndex] = miniVencedor;
      setWinners(newWinners);
    }
  };

  useEffect(() => {
    const vencedor = calculateWinner(winners);
    if (vencedor === "X" || vencedor === "O") {
      setWinner(vencedor);
      setGameOver(true);
      //console.log(winner);
    } else if (boardIsFull(winners)) {
      const vencedorEmpate = winnerFullBoard(winners);
      setWinner(vencedorEmpate);
      setGameOver(true);
      //console.log(winner);
    }
  }, [winners, setGameOver, setWinner]);

  useEffect(() => {
    if (replay) {
      setBoards(Array(9).fill(Array(9).fill(null)));
      setNextBoard(Math.floor(Math.random() * 9));
      setXIsNext(Math.round(Math.random()) === 1);
      setWinners(Array(9).fill(null));
      setWinner(null);
      setTimerJ1(60);
      setTimerJ2(60);
    }
  }, [replay, setWinner, setBoards]);

  const renderBoard = (boardIndex) => {
    const squares = boards[boardIndex];
    let squareClassName;
    let disabled;

    if (winners[boardIndex] != null) {
      if (winners[boardIndex] === "X") {
        squareClassName = "winner-square X";
        disabled = true;
      } else if (winners[boardIndex] === "O") {
        squareClassName = "winner-square O";
        disabled = true;
      } else if (winners[boardIndex] === "E") {
        squareClassName = "winner-square E";
        disabled = true;
      }
    } else if (boardIndex === nextBoard) {
      if (xIsNext) {
        squareClassName = "active-squareX";
      } else {
        squareClassName = "active-squareO";
      }
      disabled = false;
    } else {
      squareClassName = "square";
      disabled = true;
    }

    if (winners[nextBoard] != null) {
      let disponiveis = [];
      for (var i = 0; i < winners.length; i++) {
        if (winners[i] === null) {
          disponiveis.push(i);
        }
      }
      if (disponiveis.length > 0) {
        let indiceRandom = Math.floor(Math.random() * disponiveis.length);
        let posicaoRandom = disponiveis[indiceRandom];
        setNextBoard(posicaoRandom);
      }
    }

    return (
      <Board
        squareClassName={squareClassName}
        squares={squares}
        onClick={(squareIndex) => handleSquareClick(boardIndex, squareIndex)}
        disabled={disabled}
      />
    );
  };

  return (
    <section className={gameStarted ? "jogo" : "jogo hide"}>
      <div className="pre-jogo-info">
        {gameStarted && (
          <div className="info-nomes">
            {player1Symbol && player2Symbol && (
              <div id="j1">
                <div id="nome1">
                  Jogador 1: {player1Name} (
                  <span className={`cor-${player1Symbol}`}>
                    {player1Symbol}
                  </span>
                  )
                </div>
                {level === "2" && <div id="timer">{timerJ1}</div>}
              </div>
            )}
            {player1Symbol && player2Symbol && (
              <div id="j2">
                <div id="nome2">
                  Jogador 2: {player2Name} (
                  <span className={`cor-${player2Symbol}`}>
                    {player2Symbol}
                  </span>
                  )
                </div>
                {level === "2" && <div id="timer">{timerJ2}</div>}
              </div>
            )}
          </div>
        )}
      </div>
      <div id="bigBoard" className="game-panel">
        {renderBoard(0)}
        {renderBoard(1)}
        {renderBoard(2)}
        {renderBoard(3)}
        {renderBoard(4)}
        {renderBoard(5)}
        {renderBoard(6)}
        {renderBoard(7)}
        {renderBoard(8)}
      </div>
    </section>
  );
};

export default GamePanel;
