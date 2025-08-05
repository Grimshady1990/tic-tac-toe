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
        board.map((line) => line[row].getValue());

        board[row][column].addMarker(player);
            
        
        
    }
    
    return {
        printBoard,
        placeMarker,
        getBoard
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
            marker:"O",
        }

    ];

    let activePlayer = player[0]

    const switchPlayer = () => {
        activePlayer = activePlayer === player[0] ?
        player[1] : player[0];
    }

    const getActivePlayer = () => activePlayer;
    
    const printNewRound = () => {
        board.printBoard();
        console.log(`It's ${getActivePlayer().name}'s turn`);
    }
    
    const playRound = (row, column) => {


        

        if (printNewRound[row][column] === ("X" || "O")) {
        
            console.log("Place marker in empty cell!");
        }
        else {

        console.log(`${getActivePlayer().name} dropped a ${getActivePlayer().marker} into row ${row} column ${column}!`);
        board.placeMarker(row, column, getActivePlayer().marker);
        switchPlayer();
        printNewRound();
        }
    }

    printNewRound();

    return {
       playRound,
       getActivePlayer, 
    }

}

const game = GameController();

game.playRound(1, 1);
game.playRound(1, 1);