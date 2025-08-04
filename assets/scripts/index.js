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
        const availableCells = board
        .map((line) => line[row].getValue());

        if (availableCells[row][column] === "X") {
        
            console.log("Place marker in empty cell!");
        }
        else {
            
            board[row][column].addMarker(player);
            printBoard();
        }
        
    }
    
    return {
        printBoard,
        placeMarker
    }
}

const game = Gameboard();
game.placeMarker(0, 0, "X");

game.placeMarker(0, 0, "O");

game.placeMarker(0, 1, "O");

game.placeMarker(0, 2, "X");

game.placeMarker(1, 0, "O");

game.placeMarker(1, 1, "X");

game.placeMarker(1, 2, "O");

game.placeMarker(2, 0, "X");

game.placeMarker(2, 1, "O");

game.placeMarker(2, 2, "X");

