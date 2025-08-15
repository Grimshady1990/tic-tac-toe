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

  const noPrintBoard = () => {
    const boardWithValues = board.map((row) =>
      row.map((cell) => cell.getValue()),
    );

    return boardWithValues;

  };

  let errorCatcher = false;
  let errorCatcher2 = false;
  let errorCatcher3 = false;

  const placeMarker = (row, column, player) => {
    if (board[row][column].getValue() !== "-") {
      errorCatcher = true;
      return;
    } else {
      errorCatcher = false;

      board[row][column].addMarker(player);
    }
  };

  const boardReset = () => {
    board.map((row) =>
      row.map((cell) => cell.addMarker("-")),
    );
    board.map((row) =>
      row.map((cell) => cell.getValue()),
    );
    

    
  }

  const roundDraw = () => {
    availableCells0 = board
        .filter((row) => row[0].getValue() === "-")
        .map((row) => row[0].getValue())

    availableCells1 = board
        .filter((row) => row[1].getValue() === "-")
        .map((row) => row[1].getValue())
    
    availableCells2 = board
        .filter((row) => row[2].getValue() === "-")
        .map((row) => row[2].getValue())
             
    // console.log(availableCells0);
    // console.log(availableCells1);
    // console.log(availableCells2);

    if(!availableCells0.length && !availableCells1.length && !availableCells2.length){
      errorCatcher3 = true;
      return;
    } else{
      errorCatcher3 = false;
      return;
    }
    
    
  }
  
  const roundWinner = (player, marker) => {

    
    
    
    if (
       (board[1][0].getValue() === marker && 
       board[1][1].getValue() === marker &&
       board[1][2].getValue() === marker) ||
      
       (board[0][0].getValue() === marker && 
       board[0][1].getValue() === marker &&
       board[0][2].getValue() === marker) ||
      
       (board[2][0].getValue() === marker && 
       board[2][1].getValue() === marker &&
       board[2][2].getValue() === marker) || 
       
       (board[0][0].getValue() === marker && 
       board[1][0].getValue() === marker &&
       board[2][0].getValue() === marker) ||

       (board[0][1].getValue() === marker && 
       board[1][1].getValue() === marker &&
       board[2][1].getValue() === marker) ||

       (board[0][2].getValue() === marker && 
       board[1][2].getValue() === marker &&
       board[2][2].getValue() === marker) ||

       (board[0][0].getValue() === marker && 
       board[1][1].getValue() === marker &&
       board[2][2].getValue() === marker) ||

       (board[0][2].getValue() === marker && 
       board[1][1].getValue() === marker &&
       board[2][0].getValue() === marker) 
    ) {

      errorCatcher2 = true;
      console.log(`${player} Wins The Round!`);
      
      return;
      
      
      
    }
    
    else {
      errorCatcher2 = false;
      return;
    }
  } 

  const errorCatcherFun = () => errorCatcher;
  const errorCatcherFun2 = () => errorCatcher2;
  const errorCatcherFun3 = () => errorCatcher3;

  return {
    printBoard,
    placeMarker,
    getBoard,
    errorCatcherFun,
    roundWinner,
    boardReset,
    noPrintBoard,
    errorCatcherFun2,
    roundDraw,
    errorCatcherFun3,
  };
}

function GameController(playerOne = "Fizzy", playerTwo = "DooDaa") {
  const board = Gameboard();
  const player = [
    {
      name: playerOne,
      marker: "X",
      wins: 0,
    },
    {
      name: playerTwo,
      marker: "O",
      wins: 0,
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

  const gameOver = () => {
      if(player[0].wins || player[1].wins === 8){
        console.log(`${getActivePlayer().name} has won the game!!!`);
        player[0].wins = 0;
        player[1].wins = 0;
        
      }
    }

  const playRound = (row, column) => {

    
    
    board.placeMarker(row, column, getActivePlayer().marker);

    if (board.errorCatcherFun() === true) {
      console.log(`${getActivePlayer().name}, this space is taken. Try Again!`);
      return;
    }

    console.log(`${getActivePlayer().name} just placed a marker`);

    board.roundWinner(getActivePlayer().name, getActivePlayer().marker);

    if (board.errorCatcherFun2() === true) {
      getActivePlayer().wins += 1;
      console.log(`${player[0].name}: ${player[0].wins} | ${player[1].name}: ${player[1].wins}`)
      gameOver();
      
      switchPlayerTurn();
      board.printBoard();
      board.boardReset();
      board.noPrintBoard();
      
      console.log("Game On!!");
      printNewBoard();
      
      return;
      
    }

    board.roundDraw();

    if (board.errorCatcherFun3() === true) {
      console.log("It's a draw");
      switchPlayerTurn();
      board.printBoard();
      board.boardReset();
      console.log("Game On!!")
      printNewBoard();
  
      return;
    }

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

//Round 1
console.log("Round Draw");
game.playRound(0, 0);
game.playRound(1, 0);
game.playRound(0, 1);
game.playRound(1, 1);
game.playRound(2, 0);
game.playRound(2, 1);
game.playRound(2, 2);
game.playRound(0, 2);
game.playRound(1, 2);

//Round 1
console.log("Round 1");
game.playRound(0, 0);
game.playRound(1, 0);
game.playRound(0, 1);
game.playRound(1, 1);
game.playRound(0, 2);

// Round 2
console.log("Round 2");
game.playRound(0, 0);
game.playRound(1, 0);
game.playRound(2, 0);
game.playRound(1, 1);
game.playRound(2, 2);
game.playRound(1, 2);

// Round 3
console.log("Round 3");
game.playRound(0, 0);
game.playRound(2, 0);
game.playRound(1, 0);
game.playRound(2, 1);
game.playRound(0, 1);
game.playRound(2, 2);

// Round 4
console.log("Round 4");
game.playRound(1, 1);
game.playRound(0, 0);
game.playRound(2, 1);
game.playRound(1, 0);
game.playRound(2, 2);
game.playRound(2, 0);

// Round 5
console.log("Round 5");
game.playRound(0, 0);
game.playRound(0, 1);
game.playRound(0, 2);
game.playRound(1, 1);
game.playRound(2, 2);
game.playRound(2, 1);

// Round 6
console.log("Round 6");
game.playRound(0, 0);
game.playRound(0, 2);
game.playRound(1, 0);
game.playRound(1, 2);
game.playRound(0, 1);
game.playRound(2, 2);

// Round 7
console.log("Round 7");
game.playRound(2, 1);
game.playRound(0, 0);
game.playRound(0, 1);
game.playRound(1, 1);
game.playRound(2, 0);
game.playRound(2, 2);

// Round 8
console.log("Round 8");
game.playRound(0, 0);
game.playRound(0, 2);
game.playRound(1, 0);
game.playRound(1, 1);
game.playRound(0, 1);
game.playRound(2, 0);