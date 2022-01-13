const Gameboard = (() => {
    let gameboard = ['X','X','X','X','X','X',"O","O","O"];
    return {gameboard, };
} )();

const Player = (number, name, type) => {
    const placeChecker = (position) => {
        Gameboard.gameboard[position] = type;
        displayController.refreshBoard()
    }
    return {number, name, type, placeChecker};
}

const player1 = Player(1, 'Mike', 'X');
const player2 = Player(2, 'Peter', "O");

const displayController = (() => {
    const container = document.querySelector('.container');
    const refreshBoard = () => {
        Gameboard.gameboard.forEach((piece, index) => {
            const block = document.createElement('div');
            block.setAttribute('data-key', `${index}`);
            block.addEventListener('click', (e) => {
                if (game.turn === 1) {
                    player1.placeChecker(e.target.getAttribute('data-key'));
                }
                else if(game.turn === 2) {
                    player2.placeChecker(e.target.getAttribute('data-key'));
                }
            })
            block.textContent = piece;
            block.classList.add("piece");
            container.appendChild(block);
        })
    }
    refreshBoard();

    return {refreshBoard};
})();

const game = (() => {

    let turn = 1;

    return {turn};
})();


