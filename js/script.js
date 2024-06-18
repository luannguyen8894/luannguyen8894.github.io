document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const status = document.getElementById("status");
    const resetButton = document.getElementById("reset-button");

    const X_CLASS = "x";
    const O_CLASS = "o";
    let currentPlayer = X_CLASS;
    let gameActive = true;
    let gameState = ["", "", "", "", "", "", "", "", ""];

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(e) {
        const cell = e.target;
        const index = parseInt(cell.getAttribute("data-index"));

        // Debugging: Log the clicked cell and index
        console.log(`Cell clicked: ${index}`);

        if (gameState[index] !== "" || !gameActive) {
            // Debugging: Log why the click was ignored
            console.log("Click ignored, cell already filled or game not active");
            return;
        }

        gameState[index] = currentPlayer;
        cell.classList.add(currentPlayer);
        cell.innerText = currentPlayer.toUpperCase();  // Update cell content to show X or O

        if (checkWin(currentPlayer)) {
            status.innerText = `${currentPlayer.toUpperCase()} wins!`;
            gameActive = false;
        } else if (!gameState.includes("")) {
            status.innerText = "It's a draw!";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === X_CLASS ? O_CLASS : X_CLASS;
            status.innerText = `Current player: ${currentPlayer.toUpperCase()}`;
        }
    }

    function checkWin(player) {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return gameState[index] === player;
            });
        });
    }

    function startGame() {
        gameState = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = X_CLASS;
        gameActive = true;
        status.innerText = `Current player: ${currentPlayer.toUpperCase()}`;
        board.innerHTML = "";
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.setAttribute("data-index", i);
            cell.classList.add("cell");
            cell.addEventListener("click", handleCellClick);
            board.appendChild(cell);
        }

        // Debugging: Log the initial game state and active status
        console.log("Game started");
        console.log(gameState);
        console.log("Game active:", gameActive);
    }

    resetButton.addEventListener("click", startGame);
    startGame();
});
