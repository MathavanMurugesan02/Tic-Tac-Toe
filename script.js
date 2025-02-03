const cells = document.querySelectorAll('.cell');
const titleHeader = document.querySelector('#titleHeader');
const xPlayerDisplay = document.querySelector('#xPlayerDisplay');
const oPlayerDisplay = document.querySelector('#oPlayerDisplay');
const restartBtn = document.querySelector('#restartBtn');

// Initialize variables for the game
let player = 'X';
let isPauseGame = false;
let isGameStart = false;

// Array to track cell inputs
const inputCells = ['', '', '', '', '', '', '', '', ''];

// Array of win conditions
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

// Add click event listeners to each cell
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => tapCell(cell, index));
});

function tapCell(cell, index) {
    // Ensure cell is empty and game isn't paused
    if (cell.textContent === '' && !isPauseGame) {
        isGameStart = true;
        updateCell(cell, index);

        // Check for a winner; if no winner and board isn't full, switch player
        if (!checkWinner() && inputCells.includes('')) {
            changePlayer();
            randomPick();
        }
    }
}

function updateCell(cell, index) {
    cell.textContent = player;
    inputCells[index] = player;
    cell.style.color = (player === 'X') ? '#1892EA' : '#A737FF';
}

function changePlayer() {
    player = (player === 'X') ? 'O' : 'X';
}

function randomPick() {
    // Pause the game to allow Computer to pick
    isPauseGame = true;

    setTimeout(() => {
        let randomIndex;
        do {
            // Pick a random index
            randomIndex = Math.floor(Math.random() * inputCells.length);
        } while (
            // Ensure the chosen cell is empty
            inputCells[randomIndex] !== ''
        );
        
        // Update the cell with computer move
        updateCell(cells[randomIndex], randomIndex);
        
        // Check if computer won, otherwise switch back to human player
        if (!checkWinner()) {
            changePlayer();
            isPauseGame = false;
        }
    }, 1000); // Delay computer move by 1 second
}

function checkWinner() {
    for (const [a, b, c] of winConditions) {
        // Check if any win condition is met
        if (inputCells[a] === player && inputCells[b] === player && inputCells[c] === player) {
            declareWinner([a, b, c]);
            return true;
        }
    }
    
    // Check for a draw
    if (!inputCells.includes('')) {
        declareDraw();
        return true;
    }
    
    return false;
}

function declareWinner(winningIndices) {
    titleHeader.textContent = `${player} Wins!`;
    isPauseGame = true;

    // Highlight winning cells
    winningIndices.forEach(index => {
        cells[index].style.background = '#2A2343';
    });

    restartBtn.style.visibility = 'visible';
}

function declareDraw() {
    titleHeader.textContent = 'Draw!';
    isPauseGame = true;
    restartBtn.style.visibility = 'visible';
}

function choosePlayer(selectedPlayer) {
    // Ensure the game hasn't started
    if (!isGameStart) {
        player = selectedPlayer;
        if (player === 'X') {
            xPlayerDisplay.classList.add('player-active');
            oPlayerDisplay.classList.remove('player-active');
        } else {
            oPlayerDisplay.classList.add('player-active');
            xPlayerDisplay.classList.remove('player-active');
        }
    }
}

// Restart game event listener
// restartBtn.addEventListener('click', () => {
//     restartBtn.style.visibility = 'hidden';

//     // Reset game state
//     isPauseGame = false;
//     isGameStart = false;
//     player = 'X';

//     // Clear game board
//     cells.forEach(cell => {
//         cell.textContent = '';
//         cell.style.background = '';
//     });

//     // Reset input array
//     inputCells.fill('');

//     // Reset title
//     titleHeader.textContent = 'Choose a Player';
// });

restartBtn.addEventListener('click', () => {
    restartBtn.style.visibility = 'hidden';

    // Reset game state
    isPauseGame = false;
    isGameStart = false;
    player = 'X';

    // Clear game board
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = ''; // Use backgroundColor for better compatibility
    });

    // Reset input array
    inputCells.fill('');

    // Reset title
    if (titleHeader) {
        titleHeader.textContent = 'Choose';
    }
});
