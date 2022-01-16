const Gameboard = (() => {
    let gameboard = [];
    for (let i = 0; i < 9; i++) {
        gameboard[i] = '';
    }
    return {gameboard};
} )();

const Player = (number, name, type) => {
    const placeChecker = (position) => {
        if(Gameboard.gameboard[position] === ''){ // check if the block is empty.
            Gameboard.gameboard[position] = type;
            displayController.refreshBoard();
            game.checkStatus(position);
            game.nextTurn();
        }
    }
    return {number, name, type, placeChecker};
}



const displayController = (() => {
    const container = document.querySelector('.container');
    const refreshBoard = () => {
        while(container.hasChildNodes()) {
            container.removeChild(container.firstChild);
        }
        Gameboard.gameboard.forEach((piece, index) => {
            const block = document.createElement('div');
            block.classList.add("piece");
            block.setAttribute('data-key', `${index}`); // locate the position of checkers.
            block.addEventListener('click', (e) => {
                if (game.getTurn() % 2 === 1) {
                    game.player1.placeChecker(parseInt(e.target.getAttribute('data-key')));
                }
                else if(game.getTurn() % 2 === 0) {
                    game.player2.placeChecker(parseInt(e.target.getAttribute('data-key')));
                }
            })
            block.textContent = piece;
            container.appendChild(block);
        })
    }
    return {refreshBoard};
})();

const game = (() => {
    let turn = 1;
    let p1Name = document.getElementById('P1-name').value;
    let p2Name = document.getElementById('P2-name').value;
    if(p1Name === '')
        p1Name = 'Player 1';
    if(p2Name === '')
        p2Name = 'Player 2';
    const player1 = Player(1, p1Name, 'X');
    const player2 = Player(2, p2Name, "O");

    const _checkRow = (row) => {
        for(let i = row * 3; i < (row + 1) * 3 - 1; i++) {
            if(Gameboard.gameboard[i] == '') {
                return 0;
            }
            if(Gameboard.gameboard[i] !== Gameboard.gameboard[i + 1])
                return 0;
        }
        return 1;
    }

    const _checkCol = (column) => {
        for(let i = column; i <= 3 + column; i = i + 3) {
            if(Gameboard.gameboard[i] == '') {
                return 0;
            }
            if(Gameboard.gameboard[i] !== Gameboard.gameboard[i + 3])
                return 0;
        }
        return 1;
    }

    const _checkDia = (position) => {
        if(position % 2 == 0) {
            if(position == 0 || position == 4 || position == 8) {
                if(Gameboard.gameboard[0] !== '' && Gameboard.gameboard[0] == Gameboard.gameboard[4] && Gameboard.gameboard[4] == Gameboard.gameboard[8]){
                    return 1;
                }
            }
            else if(position == 2 || position == 4 || position == 6) {
                if(Gameboard.gameboard[2] !== '' && Gameboard.gameboard[2] == Gameboard.gameboard[4] && Gameboard.gameboard[4] == Gameboard.gameboard[6]){
                    return 1;
                }
            }
        }
        return 0; // Without this _checkDia will return '0' instead of number 0;
    }
    const _start = () => {
        displayController.refreshBoard();
    }
    const startButton = document.querySelector('.start');
    startButton.addEventListener('click', _start);
    const getTurn = () => turn;
    const nextTurn = () => {
        turn++;
    }
    const checkStatus = (position) => {
        const row = Math.floor(position / 3);
        const column = position % 3;
        let flag = 0;
        flag += _checkRow(row);
        flag += _checkCol(column);
        flag += _checkDia(position);
        if(flag !== 0) {
            alert('win');
        }
        if(game.getTurn() === 9) {
            alert('tie');
        }
    }
    return {getTurn, nextTurn, checkStatus, player1, player2};
})();


