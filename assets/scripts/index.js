
// This function keeps the value variable private
// so it can only be accessed through closure
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

// This function contains everything to do with board manipulation
// and was created so the gameController only access what it needs to
// creating more closures 
function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  // This loop is a common way to create 2d Arrays
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  // Access the board from the ScreenController
  const getBoard = () => board;

  // Display board in the console
  const printBoard = () => {
    const boardWithValues = board.map((row) =>
      row.map((cell) => cell.getValue()),
    );
    console.log(boardWithValues);
  };



  // *********************************************************************************
  // These "Error Catchers" were created as a way
  // to control certain conditions from the playRound 
  // function.
  let errorCatcher1 = false; // Stops markers from being overwritten during play
  let errorCatcher2 = false; // Ends game when a winning pattern has been achieved
  let errorCatcher3 = false; // Ends game if all cells have been marked but no winning patterns found
  const errorCatcherFun1 = () => errorCatcher1;
  const errorCatcherFun2 = () => errorCatcher2;
  const errorCatcherFun3 = () => errorCatcher3;
  // *********************************************************************************
  const placeMarker = (row, column, player) => {
    // Tells playRound to trigger overwrite condition
    if (board[row][column].getValue() !== "-") {
      errorCatcher1 = true;
      return;
    } else {
      errorCatcher1 = false;

      board[row][column].addMarker(player);
    }
  };

  // Turn all cells back to default state
  const boardReset = () => {
    board.map((row) =>
      row.map((cell) => cell.addMarker("-")),
    );
  }

  // Checks for draw conditions if all cells are filled
  const roundDraw = () => {

    // I could not find a way to filter all cells in one filter so as a 
    // workaround i created one for each row
    const availableCells = board.flat().filter(cell => cell.getValue() === "-");

      // Checks if all filters have no length because this is equal to all
      // cells being filled thus triggering draw conditions 
    if (!availableCells.length) {
      errorCatcher3 = true;
      return;
    } else {
      errorCatcher3 = false;
      return;
    }


  }

  const winningCombos = [
    [[0,0],[0,1],[0,2]],
    [[1,0],[1,1],[1,2]],
    [[2,0],[2,1],[2,2]],
    [[0,0],[1,0],[2,0]],
    [[0,1],[1,1],[2,1]],
    [[0,2],[1,2],[2,2]],
    [[0,0],[1,1],[2,2]],
    [[0,2],[1,1],[2,0]],
  ];

  const roundWinner = (player, marker) => {

    errorCatcher2 = winningCombos.some(combo =>
      combo.every(([r,c]) => board[r][c].getValue() === marker)
    );
    if (errorCatcher2){
      console.log(`${player} Wins The Round Bosh!`);
    }
    
  }



  return {
    printBoard,
    placeMarker,
    getBoard,
    errorCatcherFun1,
    roundWinner,
    boardReset,
    errorCatcherFun2,
    roundDraw,
    errorCatcherFun3,
  };
}

// Stores player objects and control the flow of the game
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
    if (player[0].wins === 8 || player[1].wins === 8) {
      console.log(`${player[0].name}: ${player[0].wins} | ${player[1].name}: ${player[1].wins}`)
      console.log(`${getActivePlayer().name} has won the game!!!`);
      player[0].wins = 0;
      player[1].wins = 0;

    }
  }

  const playRound = (row, column) => {

    board.placeMarker(row, column, getActivePlayer().marker);

    // Triggers overwrite conditions
    if (board.errorCatcherFun1() === true) {
      console.log(`${getActivePlayer().name}, this space is taken. Try Again!`);
      return;
    }

    console.log(`${getActivePlayer().name} just placed a marker`);

    board.roundWinner(getActivePlayer().name, getActivePlayer().marker);

    // Triggers win conditions
    if (board.errorCatcherFun2() === true) {
      getActivePlayer().wins += 1;
      gameOver();
      switchPlayerTurn();
      board.printBoard();
      board.boardReset();
      console.log(`${player[0].name}: ${player[0].wins} | ${player[1].name}: ${player[1].wins}`)
      console.log("Game On!!");
      printNewBoard();
      return;

    }

    board.roundDraw();

    // Triggers draw conditions
    if (board.errorCatcherFun3() === true) {
      console.log("It's a draw");
      switchPlayerTurn();
      board.printBoard();
      board.boardReset();
      console.log(`${player[0].name}: ${player[0].wins} | ${player[1].name}: ${player[1].wins}`)
      console.log("Game On!!")
      printNewBoard();

      return;
    }

    // Default conditions if no other conditions are met
    switchPlayerTurn();
    printNewBoard();





  };
  // ************************************************************************
  // Initiate new game board when a new instance of GameController is created
  console.log(`${player[0].name}: ${player[0].wins} | ${player[1].name}: ${player[1].wins}`)
  console.log("Game On!!");
  printNewBoard();
  // ************************************************************************

  return {
    playRound,
    getActivePlayer,
  };
}

const game = GameController();



//Round 1
console.log("Round 1");
game.playRound(0, 0);
game.playRound(1, 0);
game.playRound(0, 1);
game.playRound(1, 1);
game.playRound(0, 2);

//Round Draw
console.log("Round Draw");
game.playRound(0, 0);
game.playRound(1, 0);
game.playRound(1, 0);
game.playRound(0, 1);
game.playRound(1, 1);
game.playRound(2, 0);
game.playRound(2, 1);
game.playRound(2, 2);
game.playRound(0, 2);
game.playRound(1, 2);

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

// Round 9
console.log("Round 9");
game.playRound(0, 0);
game.playRound(0, 2);
game.playRound(1, 0);
game.playRound(1, 1);
game.playRound(0, 1);
game.playRound(2, 0);