import "./control-panel.css";

const ControlPanel = (props) => {
  const {
    level,
    gameStarted,
    onGameStart,
    handlePlayer1NameChange,
    handlePlayer2NameChange,
    onLevelChange,
    player1Name,
    player2Name,
  } = props;

  let labelSingle = "";
  if (level === "1") {
    labelSingle = "Nome Jogador:";
  } else {
    labelSingle = "Nome Jogador 1:";
  }

  return (
    <section>
      <div className={gameStarted ? "panel-control hide" : "panel-control"}>
        <form className="form">
          <label htmlFor="btLevel">Nível:</label>
          <select
            id="btLevel"
            value={level}
            onChange={onLevelChange}
            disabled={gameStarted}
          >
            <option value="0">Seleccione...</option>
            <option value="1">Singleplayer</option>
            <option value="2">Multiplayer</option>
          </select>
          {(level === "1" || level === "2") && (
            <>
              <label htmlFor="1name">{labelSingle}</label>
              <input
                type="text"
                id="name1"
                name="1name"
                value={player1Name}
                disabled={level === "0" || gameStarted}
                onChange={handlePlayer1NameChange}
              />
            </>
          )}
          {level === "2" && ( // Render Jogador 2 input only if level is "Multiplayer"
            <>
              <label htmlFor="2name">Nome Jogador 2: </label>
              <input
                type="text"
                id="name2"
                name="2name"
                value={player2Name}
                disabled={level === "1" || gameStarted} // Disable the input when level is "Singleplayer"
                onChange={handlePlayer2NameChange}
              />
            </>
          )}
        </form>
        <button
          type="button"
          id="btPlay"
          disabled={level === "0" || gameStarted}
          onClick={onGameStart} // {gameStarted ? "Parar Jogo" : "Iniciar Jogo"}
        >
          Iniciar Jogo
        </button>
      </div>
    </section>
  );
};

export default ControlPanel;
