var board;
let player1 = "X";
let player2 = "O";
var currentplayer = player1;
var gameover = false;
var player1Score = 0;
var player2Score = 0;

window.onload = function () {
    setgame();
    document.getElementById("resetButton").addEventListener("click", resetGame);
}

function setgame() {
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ]
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            let box = document.createElement("div");
            box.id = row.toString() + "-" + col.toString();
            box.classList.add("box");
            if (row == 0 || row == 1) {
                box.classList.add("horizontalline");
            }
            if (col == 0 || col == 1) {
                box.classList.add("verticalline");
            }
            box.addEventListener("click", setbox);
            document.getElementById("board").append(box);
        }
    }
}

function setbox() {
    if (gameover) {
        return;
    }
    let coords = this.id.split("-")
    let row = parseInt(coords[0]);
    let col = parseInt(coords[1]);
    if (board[row][col] != ' ') {
        return;
    }
    board[row][col] = currentplayer;
    this.innerText = currentplayer;
    if (currentplayer == player1) {
        currentplayer = player2;
    } else {
        currentplayer = player1;
    }
    checkwinner();
}

function checkwinner() {
    // Check for a winner
    for (let row = 0; row < 3; row++) {
        if (board[row][0] == board[row][1] && board[row][1] == board[row][2] && board[row][0] != ' ') {
            for (let i = 0; i < 3; i++) {
                let box = document.getElementById(row.toString() + "-" + i.toString());
                box.classList.add("winner");
            }
            gameover = true;
            updateScores();
            return;
        }
    }

    for (let col = 0; col < 3; col++) {
        if (board[0][col] == board[1][col] && board[1][col] == board[2][col] && board[0][col] != ' ') {
            for (let i = 0; i < 3; i++) {
                let box = document.getElementById(i.toString() + "-" + col.toString());
                box.classList.add("winner");
            }
            gameover = true;
            updateScores();
            return;
        }
    }

    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') {
        for (let i = 0; i < 3; i++) {
            let box = document.getElementById(i.toString() + "-" + i.toString());
            box.classList.add("winner");
        }
        gameover = true;
        updateScores();
        return;
    }

    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {
        let box1 = document.getElementById("0-2");
        let box2 = document.getElementById("1-1");
        let box3 = document.getElementById("2-0");
        box1.classList.add("winner");
        box2.classList.add("winner");
        box3.classList.add("winner");
        gameover = true;
        updateScores();
        return;
    }

    // Check for a tie
    let isTie = true;
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === ' ') {
                isTie = false;
                break;
            }
        }
        if (!isTie) break;
    }
    if (isTie) {
        gameover = true;
        showTieMessage();
    }
}

function updateScores() {
    if (currentplayer === player1) {
        player2Score++;
    } else {
        player1Score++;
    }
    document.getElementById("player1Score").innerText = player1Score;
    document.getElementById("player2Score").innerText = player2Score;
}

function showTieMessage() {
    let tieMessage = document.createElement("p");
    tieMessage.innerText = "It's a tie!";
    tieMessage.classList.add("tie");
    document.body.appendChild(tieMessage);
}

function resetGame() {
    // Clear the board
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            let box = document.getElementById(row.toString() + "-" + col.toString());
            box.innerText = '';
            box.classList.remove("winner");
        }
    }
    // Reset game variables
    gameover = false;
    currentplayer = player1;
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];
    // Remove the tie message if it exists
    let tieMessage = document.querySelector(".tie");
    if (tieMessage) {
        tieMessage.remove();
    }
}
