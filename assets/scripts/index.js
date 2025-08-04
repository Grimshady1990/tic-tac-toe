function Cell() {
    let value = " ";
    const getValue = () => value;
    const addToken = (player) => {
        value = player;
    };
    return {
        getValue
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
    return {
        printBoard
    }
}

const game = Gameboard();
game.printBoard();