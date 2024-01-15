const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

let min = 1
let max = 2
let total = {
	totalGames: 0,
	heads: 0,
	tails: 0,
	win: 0,
	loss: 0
}

let json = JSON.stringify(total)

function randomNum(min, max) {
	let num = Math.floor(Math.random() * (max - min + 1) + min);

	switch (num) {
		case 1:
			total.heads +=1
			return 'Орёл';
		case 2:
			total.tails +=1
			return 'Решка';
		default:
			console.log('Пожалуйста, введите 1 (Орёл) или 2 (Решка).');
			break;
	}
}

function logResult(filename, total) {
	let json = JSON.stringify(total)
	fs.writeFileSync(filename, json, 'utf8');
}

function playGame(logFilename) {

	try {
		let json = fs.readFileSync(logFilename, 'utf8');
		total = JSON.parse(json)
	} catch (err) {
		console.error(`Ошибка ${logFilename}: ${err}`);
	}

  rl.question('Угадайте, что выпадет: 1 (Орёл) или 2 (Решка)? ', (answer) => {
    const userGuess = parseInt(answer);
		total.totalGames += 1

    if (userGuess === 1 || userGuess === 2) {
      const coinSide = randomNum(min, max)

			if ((userGuess === 1 && coinSide === 'Орёл') || (userGuess === 2 && coinSide === 'Решка')) {
				console.log('Вы угадали. Загадано: ' + coinSide);
				total.win +=1
			} else {
				console.log('Вы не угадали. Загадано: ' + coinSide);
				total.loss += 1
			}
      logResult(logFilename, total);
			playGame(logFilename)
    } else {
      console.log('Пожалуйста, введите 1 (Орёл) или 2 (Решка).');
			playGame(logFilename)
    }
  });

}

const logFilename = `${process.argv[2]}.json`

if (!process.argv[2]) {
  console.error('Укажите имя файла для логирования результатов. ');
  process.exit(1);
} else{
	fs.writeFile(logFilename, json, 'utf8', (err) => {
		if (err) {
			console.error(`Ошибка при создании файла: ${err}`);
		} else {
			playGame(logFilename);
		}
	});
}
