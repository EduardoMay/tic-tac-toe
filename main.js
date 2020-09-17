const winners = [
    ['0', '1', '2'],
    ['3', '4', '5'],
    ['6', '7', '8'],
    ['0', '3', '6'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['0', '4', '8'],
    ['2', '4', '6'],
];

let pointsPlayer1 = 0, pointsPlayer2 = 0,  player1 = true, player2 = false;

const gameItems = document.querySelectorAll(".game-item");

gameItems.forEach(item => {
    item.addEventListener("click", e => {
        changePlayer(e);
    });
});

function changePlayer(e) {
    if(player1) {
        console.log('player 1');
        e.target.dataset['player'] = 1;
        e.target.classList += ' selected';
        e.target.textContent = 'X';

        player1 = false;
        player2 = true;
    } else if(player2) {
        console.log('player 2');
        e.target.dataset['player'] = 2;
        e.target.classList += ' selected';
        e.target.textContent = 'O';

        player1 = true;
        player2 = false;
    }
}
