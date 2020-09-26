document.querySelector('#points-1').innerHTML = localStorage.player1 || 0;
document.querySelector('#points-2').innerHTML = localStorage.player2 || 0;

const options = {
	automatico: true,
	manual: false,
};
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
let tablePlayer = [
	['-', '-', '-'],
	['-', '-', '-'],
	['-', '-', '-'],
];

let pointsPlayer1 = 0,
	pointsPlayer2 = 0,
	player1 = true,
	player2 = false;

const gameItems = document.querySelectorAll('.game-item');

gameItems.forEach((item) => {
	item.addEventListener('click', (e) => {
		changePlayer(e);
	});
});

function changePlayer(e) {
	const dataGame = Number(e.target.dataset['game']);

	if (player1) {
		e.target.dataset['player'] = 1;
		e.target.classList += ' selected';
		e.target.textContent = 'X';

		setItemPlayer(dataGame, 1);
		resolverHorizontalPlayer('X');
		resolverVerticalPlayer('X');
		resolverDiagonalPlayer('X');

		if (options.automatico) {
			player1 = false;
			player2 = true;
		}
	} else if (player2) {
		e.target.dataset['player'] = 2;
		e.target.classList += ' selected';
		e.target.textContent = 'O';

		setItemPlayer(dataGame, 2);
		resolverHorizontalPlayer('O');
		resolverVerticalPlayer('O');
		resolverDiagonalPlayer('O');

		if (options.automatico) {
			player1 = true;
			player2 = false;
		}
	}
}

function setItemPlayer(dataGame, dataPlayer) {
	if (dataGame >= 0 && dataGame < 3) {
		if (dataPlayer === 1) {
			tablePlayer[0][dataGame] = 'X';
		}

		if (dataPlayer === 2) {
			tablePlayer[0][dataGame] = 'O';
		}
	} else if (dataGame >= 3 && dataGame < 6) {
		if (dataPlayer === 1) {
			tablePlayer[1][dataGame - 3] = 'X';
		}

		if (dataPlayer === 2) {
			tablePlayer[1][dataGame - 3] = 'O';
		}
	} else {
		if (dataPlayer === 1) {
			tablePlayer[2][dataGame - 6] = 'X';
		}

		if (dataPlayer === 2) {
			tablePlayer[2][dataGame - 6] = 'O';
		}
	}
}

function resolverHorizontalPlayer(itemPlayer) {
	for (let i = 0; i < 3; i++) {
		const items = tablePlayer[i];

		if (items.every((item) => item === itemPlayer)) {
			switch (i) {
				case 0:
					document
						.querySelector(`[data-game='1']`)
						.classList.add('winner-h');
					break;
				case 1:
					document
						.querySelector(`[data-game='4']`)
						.classList.add('winner-h');
					break;

				default:
					document
						.querySelector(`[data-game='7']`)
						.classList.add('winner-h');
					break;
			}

			printTextWinner(player1);

			break;
		}
	}
}

function resolverVerticalPlayer(itemPlayer) {
	let tableVertical = [
		[tablePlayer[0][0], tablePlayer[1][0], tablePlayer[2][0]],
		[tablePlayer[0][1], tablePlayer[1][1], tablePlayer[2][1]],
		[tablePlayer[0][2], tablePlayer[1][2], tablePlayer[2][2]],
	];

	for (let i = 0; i < 3; i++) {
		const items = tableVertical[i];

		if (items.every((item) => item === itemPlayer)) {
			switch (i) {
				case 0:
					document
						.querySelector(`[data-game='0']`)
						.classList.add('winner-v');
					break;
				case 1:
					document
						.querySelector(`[data-game='1']`)
						.classList.add('winner-v');
					break;

				default:
					document
						.querySelector(`[data-game='2']`)
						.classList.add('winner-v');
					break;
			}

			printTextWinner(player1);

			break;
		}
	}
}

function resolverDiagonalPlayer(itemPlayer) {
	let tableVertical = [
		[tablePlayer[0][0], tablePlayer[1][1], tablePlayer[2][2]],
		[tablePlayer[0][2], tablePlayer[1][1], tablePlayer[2][0]],
	];

	for (let i = 0; i < 2; i++) {
		const items = tableVertical[i];

		if (items.every((item) => item === itemPlayer)) {
			switch (i) {
				case 0:
					document
						.querySelector(`[data-game='0']`)
						.classList.add('winner-d-1');
					break;

				default:
					document
						.querySelector(`[data-game='2']`)
						.classList.add('winner-d-2');
					break;
			}

			printTextWinner(player1);

			break;
		}
	}
}

function printTextWinner(player) {
	player
		? (document.querySelector('#winner').innerHTML = 'Ganador Equipo 1')
		: (document.querySelector('#winner').innerHTML = 'Ganador Equipo 2');

	const pointsNow1 = Number(localStorage.player1);
	const pointsNow2 = Number(localStorage.player2);

	if (player) {
		if (pointsNow1) {
			localStorage.setItem('player1', pointsNow1 + 1);
		} else {
			localStorage.setItem('player1', 1);
		}

		document.querySelector('#points-1').innerHTML = localStorage.player1;
	} else {
		if (pointsNow2) {
			localStorage.setItem('player2', pointsNow2 + 1);
		} else {
			localStorage.setItem('player2', 1);
		}

		document.querySelector('#points-2').innerHTML = localStorage.player2;
	}
}

document.querySelector('#clear').addEventListener('click', () => {
	tablePlayer = [
		['-', '-', '-'],
		['-', '-', '-'],
		['-', '-', '-'],
	];

	document.querySelector('#winner').innerHTML = '';

	gameItems.forEach((item, index) => {
		item.classList.remove('winner-h');
		item.classList.remove('winner-v');
		item.classList.remove('winner-d-1');
		item.classList.remove('winner-d-2');
		item.classList.remove('selected');
		item.dataset['player'] = '-';
		item.innerHTML = index + 1;
	});
});

document.querySelector('#reset').addEventListener('click', () => {
	tablePlayer = [
		['-', '-', '-'],
		['-', '-', '-'],
		['-', '-', '-'],
	];

	document.querySelector('#winner').innerHTML = '';

	localStorage.removeItem('player1');
	localStorage.removeItem('player2');

	document.querySelector('#points-1').innerHTML = 0;
	document.querySelector('#points-2').innerHTML = 0;

	gameItems.forEach((item, index) => {
		item.classList.remove('winner-h');
		item.classList.remove('winner-v');
		item.classList.remove('winner-d-1');
		item.classList.remove('winner-d-2');
		item.classList.remove('selected');
		item.dataset['player'] = '-';
		item.innerHTML = index + 1;
	});
});

const btnPlayer1 = document
	.querySelector('#player-1')
	.classList.add('selected');
const btnPlayer2 = document
	.querySelector('#player-2')
	.classList.add('selected');
const elementChangePlay = document.querySelector('#change-options');
const btnGameType = document.querySelector('#game-type');

player1 ? btnPlayer1 : btnPlayer2;

btnPlayer1.addEventListener('click', (_) => {
	player1 = !player1;
	player2 = false;

	btnPlayer1.classList.add('selected');
	btnPlayer2.classList.remove('selected');
});

btnPlayer2.addEventListener('click', (_) => {
	player1 = false;
	player2 = !player2;

	btnPlayer1.classList.remove('selected');
	btnPlayer2.classList.add('selected');
});

if (options.automatico) {
	elementChangePlay.classList.add('d-none');
}

gameType.addEventListener('click', (e) => {
	const type = Number(e.target.dataset['gameType']);

	if (type === 1) {
		options.automatico = false;
		options.manual = true;
		e.target.dataset['gameType'] = 2;
		elementChangePlay.classList.remove('d-none');
	} else {
		options.automatico = true;
		options.manual = false;
		e.target.dataset['gameType'] = 1;
		elementChangePlay.classList.add('d-none');
	}
});
