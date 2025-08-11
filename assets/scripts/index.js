function Cell() {
  let value = "-";
  const getValue = () => value;
  const addMarker = (player) => {
    value = player;
  };
  return {
    getValue,
    addMarker,
  };
}

function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];

    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }
  const getBoard = () => board;

  const printBoard = () => {
    const boardWithValues = board.map((row) =>
      row.map((cell) => cell.getValue()),
    );

    console.log(boardWithValues);
  };

  let errorCatcher = false;

  const placeMarker = (row, column, player) => {
    if (board[row][column].getValue() !== "-") {
      errorCatcher = true;
      return;
    } else {
      errorCatcher = false;

      board[row][column].addMarker(player);
    }
  };

  
  const roundWinner = (player, marker) => {

    
    
    if (
      board[0][0].getValue() && board[0][1].getValue() && board[0][2].getValue() === marker
    ) {
      console.log(`${player} Wins The Round!`);
    }

    return;

  } 

  const errorCatcherFun = () => errorCatcher;

  return {
    printBoard,
    placeMarker,
    getBoard,
    errorCatcherFun,
    roundWinner,
  };
}

function GameController(playerOne = "Fizzy", playerTwo = "DooDaa") {
  const board = Gameboard();
  const player = [
    {
      name: playerOne,
      marker: "X",
    },
    {
      name: playerTwo,
      marker: "O",
    },
  ];

  let activePlayer = player[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === player[0] ? player[1] : player[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewBoard = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn`);
  };

  const playRound = (row, column) => {
    board.placeMarker(row, column, getActivePlayer().marker);

    if (board.errorCatcherFun() === true) {
      console.log(`${getActivePlayer().name}, this space is taken. Try Again!`);
      return;
    }

    console.log(`${getActivePlayer().name} just placed a marker`);

    board.roundWinner(getActivePlayer().name, getActivePlayer().marker);

    switchPlayerTurn();
    printNewBoard();
    
  };

  console.log("Game On!!");
  printNewBoard();

  return {
    playRound,
    getActivePlayer,
  };
}

const game = GameController();
game.playRound(0, 0);
game.playRound(0, 0);
game.playRound(1, 0);
game.playRound(0, 1);
game.playRound(1, 1);
game.playRound(0, 2);


game.playRound(1, 2);
game.playRound(2, 0);
game.playRound(2, 1);
game.playRound(2, 2);

