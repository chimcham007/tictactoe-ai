let currentPlayer = 'X';
let gameMode = '';
let aiDifficulty = 'easy';
const cells = document.querySelectorAll('.cell');

const toggleDarkModeButton = document.getElementById('toggle-dark-mode');
toggleDarkModeButton.addEventListener('click', function() {
    document.body.classList.toggle('light-mode');
});

const startScreen = document.getElementById('start-screen');
const playAIButton = document.getElementById('play-ai');
const playFriendButton = document.getElementById('play-friend');
const aiDifficultyScreen = document.getElementById('ai-difficulty');
const gameBoard = document.getElementById('game-board');

const resultModal = document.getElementById('result-modal');
const resultMessage = document.getElementById('result-message');
const restartGameButton = document.getElementById('restartGame');

playAIButton.addEventListener('click', function() {
    gameMode = 'ai';
    startScreen.style.display = 'none';
    aiDifficultyScreen.style.display = 'block';
});

playFriendButton.addEventListener('click', function() {
    gameMode = 'friend';
    startScreen.style.display = 'none';
    gameBoard.style.display = 'grid';
});

aiDifficultyScreen.addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON') {
        aiDifficulty = event.target.dataset.difficulty;
        aiDifficultyScreen.style.display = 'none';
        gameBoard.style.display = 'grid';
    }
});

function checkWin(board, player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => 
        pattern.every(index => board[index] === player)
    );
}

function checkTie(board) {
    return board.every(cell => cell !== '');
}

function aiMove(board) {
    let emptyCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    let move;

    if (aiDifficulty === 'easy') {
        move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    } else if (aiDifficulty === 'medium') {
        move = emptyCells.find(index => {
            board[index] = 'O';
            if (checkWin(board, 'O')) return true;
            board[index] = '';
        }) || emptyCells.find(index => {
            board[index] = 'X';
            if (checkWin(board, 'X')) return true;
            board[index] = '';
        }) || emptyCells[Math.floor(Math.random() * emptyCells.length)];
    } else {
        move = emptyCells.find(index => {
            board[index] = 'O';
            if (checkWin(board, 'O')) return true;
            board[index] = '';
        }) || emptyCells.find(index => {
            board[index] = 'X';
            if (checkWin(board, 'X')) return true;
            board[index] = '';
        }) || emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    return move;
}

function placeMark(cell, mark) {
    const markElement = document.createElement('span');
    markElement.innerText = mark;

    if (mark === 'X') {
        markElement.classList.add('x');
    } else {
        markElement.classList.add('o');
    }

    cell.appendChild(markElement);
    markElement.offsetHeight;
    markElement.style.opacity = '1';
    cell.style.pointerEvents = 'none';
}

function handlePlayerMove(event) {
    const cell = event.target;
    const cellIndex = cell.dataset.index;

    if (cell.innerText !== '') return;

    placeMark(cell, currentPlayer);

    const board = Array.from(cells).map(cell => cell.innerText);
    if (checkWin(board, currentPlayer)) {
        resultMessage.innerText = `${currentPlayer} Wins!`;
        resultModal.style.display = 'block';
    } else if (checkTie(board)) {
        resultMessage.innerText = `It's a Tie!`;
        resultModal.style.display = 'block';
    } else {
        if (gameMode === 'ai' && currentPlayer === 'X') {
            currentPlayer = 'O';
            const move = aiMove(board);
            placeMark(cells[move], 'O');

            const newBoard = Array.from(cells).map(cell => cell.innerText);
            if (checkWin(newBoard, 'O')) {
                resultMessage.innerText = `O Wins!`;
                resultModal.style.display = 'block';
            } else if (checkTie(newBoard)) {
                resultMessage.innerText = `It's a Tie!`;
                resultModal.style.display = 'block';
            } else {
                currentPlayer = 'X';
            }
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

cells.forEach(cell => {
    cell.addEventListener('click', handlePlayerMove);
});

restartGameButton.addEventListener('click', function() {
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('x', 'o');
        cell.style.pointerEvents = 'auto';
    });
    resultModal.style.display = 'none';
    gameBoard.style.display = 'none';
    startScreen.style.display = 'block';
    currentPlayer = 'X';
});
