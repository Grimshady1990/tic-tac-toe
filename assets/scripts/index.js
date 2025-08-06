function Cell() {
    let value = " ";
    const getValue = () => value;
    const addMarker = (player) => {
        value = player;
    };
    return {
        getValue,
        addMarker
    }
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
        const boardWithValues = board.map((row) => row.map((cell) => cell.getValue()));
        
        console.log(boardWithValues);
    }

    const placeMarker = (row, column, player) => {

        if (board[row][column].getValue() !== " ") {
            console.log("ERrrror");
            return;
        }
        
        board[row][column].addMarker(player);
        
        
        
        
    }
    
    return {
        printBoard,
        placeMarker
    }
}

function GameController(
    playerOne = "Fizzy",
    playerTwo = "DooDaa"
) {
    const board = Gameboard();
    const player = [
        {
            name: playerOne,
            marker: "X",
        },
        {
            name: playerTwo,
            marker: "O"
        },
    ];

    let activePlayer = player[0]

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === player[0] ?
        player[1] : player[0]; 
    };

    const getActivePlayer = () => activePlayer;

    const printNewBoard = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn`)
    }

    const playRound = (row, column) => {
        
        console.log(`${getActivePlayer().name} just placed a marker`);
        board.placeMarker(row, column, getActivePlayer().marker);

        switchPlayerTurn();
        printNewBoard();

    }
    printNewBoard();

    return{
        playRound
    }
}

const game = GameController();
game.playRound(0, 0);
game.playRound(0, 0)

// const game = Gameboard();
// game.placeMarker(0, 0, "X");

// game.placeMarker(0, 0, "O");

// game.placeMarker(0, 1, "O");

// game.placeMarker(0, 1, "X");

// game.placeMarker(0, 2, "X");

// game.placeMarker(1, 0, "O");

// game.placeMarker(1, 1, "X");

// game.placeMarker(1, 1, "O");

// game.placeMarker(2, 0, "X");

// game.placeMarker(2, 0, "O");

// game.placeMarker(2, 2, "X");

