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
            game.checkStatus(position, number);
            game.nextTurn();
        }
    }
    return {number, name, type, placeChecker};
}





const game = (() => {
    let turn = 1;
    let player1 = Player(1, 'Player 1', 'X');
    let player2 = Player(2, 'Player 2', "O");

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



    const start = () => {
        let p1Name = document.getElementById('P1-name').value;
        let p2Name = document.getElementById('P2-name').value;
        if(p1Name === '')
            p1Name = 'Player 1';
        if(p2Name === '')
            p2Name = 'Player 2';
        game.player1.name = p1Name;
        game.player2.name = p2Name;
        displayController.refreshBoard();
    }

    const getTurn = () => turn;

    const nextTurn = () => {
        turn++;
    }

    const setTurn = (num) => {
        turn = parseInt(num);
    }

    const checkStatus = (position, number) => {
        const row = Math.floor(position / 3);
        const column = position % 3;
        let flag = 0;
        let winner = game.player1;
        if(number == 2) 
            winner = game.player2;
        flag += _checkRow(row);
        flag += _checkCol(column);
        flag += _checkDia(position);
        if(flag !== 0) {
            displayController.popMessage(`${player1.name} WON!!!`);
            displayController.endGame();
        }
        if(game.getTurn() === 9) {
            displayController.popMessage('TIE');
            displayController.endGame();
        }
    }

    return {getTurn, nextTurn, setTurn,  checkStatus, start , player1, player2};
})();

const displayController = (() => {
    const startButton = document.querySelector('.start');
    const popupBox = document.querySelector('.popup');
    const popupText = document.querySelector('.popup .text');
    const overlay = document.getElementById('overlay');
    const closeButton = document.querySelector('.close-button');
    const restartButton = document.querySelector('.restart');
    const container = document.querySelector('.container');

    closeButton.addEventListener('click', ()=>{
        popupBox.classList.remove('active');
        overlay.classList.remove('active');
    })

    startButton.addEventListener('click', game.start);
    
    restartButton.addEventListener('click', () => {
        popupBox.classList.remove('active');
        overlay.classList.remove('active');
        displayController.cleanBoard();
        game.start();
    });

    const addEvent = (e) => {
            if (game.getTurn() % 2 === 1) {
                game.player1.placeChecker(parseInt(e.target.getAttribute('data-key')));
            }
            else if(game.getTurn() % 2 === 0) {
                game.player2.placeChecker(parseInt(e.target.getAttribute('data-key')));
            }
        }
    const popMessage = (str) => {
        popupText.textContent = str;
        popupBox.classList.add('active');
        overlay.classList.add('active');
    }

    const cleanBoard = () => {
        for (let i = 0; i < 9; i++) {
            Gameboard.gameboard[i] = '';
        }
        game.setTurn(1);
        refreshBoard();
    }

    const refreshBoard = () => {
        while(container.hasChildNodes()) {
            container.removeChild(container.firstChild);
        }
        Gameboard.gameboard.forEach((piece, index) => {
            const block = document.createElement('div');
            block.classList.add("piece");
            block.setAttribute('data-key', `${index}`); // locate the position of checkers.
            block.addEventListener('click', addEvent);
            block.textContent = piece;
            container.appendChild(block);
        })
    }

    const endGame = () => {
        blocks = document.querySelectorAll('.piece');
        blocks.forEach((block) => {
            block.removeEventListener('click', addEvent);
        });
    }

    return {refreshBoard, cleanBoard, popMessage, addEvent, endGame};
})();

