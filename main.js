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
const tablePlayer = [['', '', ''], ['', '', ''], ['', '', '']];

let pointsPlayer1 = 0, pointsPlayer2 = 0,  player1 = true, player2 = false;

const gameItems = document.querySelectorAll(".game-item");

gameItems.forEach(item => {
    item.addEventListener("click", e => {
        changePlayer(e);
    });
});

function changePlayer(e) {
    const dataGame = Number(e.target.dataset['game']);

    if(player1) {
        e.target.dataset['player'] = 1;
        e.target.classList += ' selected';
        e.target.textContent = 'X';

        setItemPlayer(dataGame, 1);
        resolverHorizontalPlayer('X');

        player1 = false;
        player2 = true;
    } else if(player2) {
        e.target.dataset['player'] = 2;
        e.target.classList += ' selected';
        e.target.textContent = 'O';

        setItemPlayer(dataGame, 2);
        resolverHorizontalPlayer('O');

        player1 = true;
        player2 = false;
    }
}

function setItemPlayer(dataGame, dataPlayer) {
    if (dataGame >= 0 && dataGame < 3) {
        if (dataPlayer === 1) {
            tablePlayer[0][dataGame] = 'X';
        }

        if(dataPlayer === 2) {
            tablePlayer[0][dataGame] = 'O';
        }
    } else if (dataGame >= 3 && dataGame < 6) {
        if (dataPlayer === 1) {
            tablePlayer[1][dataGame - 3] = 'X';
        }

        if(dataPlayer === 2) {
            tablePlayer[1][dataGame - 3] = 'O';
        }
    } else {
        if (dataPlayer === 1) {
            tablePlayer[2][dataGame - 6] = 'X';
        }

        if(dataPlayer === 2) {
            tablePlayer[2][dataGame - 6] = 'O';
        }
    }
}

function resolverHorizontalPlayer(itemPlayer) {
    console.table(tablePlayer)
    for (let i = 0; i < 3; i++) {
        const items = tablePlayer[i];

        if(items.every(item => item === itemPlayer)) {
            switch (i) {
                case 0:
                    for (let i = 0; i < 3; i++) {
                        document.querySelector(`[data-game='${i}']`).classList.add('winner');
                    }
                    break;
                case 1:
                    for (let i = 3; i < 6; i++) {
                        document.querySelector(`[data-game='${i}']`).classList.add('winner');
                    }
                    break;

                default:
                    for (let i = 6; i < 9; i++) {
                        document.querySelector(`[data-game='${i}']`).classList.add('winner');
                    }
                    break;
            }
            console.log('Ganastes');

            if(player1) {
                console.log('Player 1');
                document.querySelector('#winner').innerHTML = 'Gano X';
            } else {
                console.log('Player 2');
                document.querySelector('#winner').innerHTML = 'Gano O';
            }
            break;
        }
    }
}