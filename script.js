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
            game.nextTurn();
        }
        displayController.refreshBoard()
    }
    return {number, name, type, placeChecker};
}

const player1 = Player(1, 'Mike', 'X');
const player2 = Player(2, 'Peter', "O");

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
                    player1.placeChecker(e.target.getAttribute('data-key'));
                }
                else if(game.getTurn() % 2 === 0) {
                    player2.placeChecker(e.target.getAttribute('data-key'));
                }
            })
            block.textContent = piece;
            container.appendChild(block);
        })
    }
    refreshBoard();
    return {refreshBoard};
})();

const game = (() => {
    let turn = 1;
    const getTurn = () => turn;
    const nextTurn = () => {
        turn++;
    }
    const checkStatus = () => {

    }
    return {getTurn, nextTurn};
})();


