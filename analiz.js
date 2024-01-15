const fs = require('fs')

const logFilename = process.argv[2];

 if (!process.argv[2]) {
  console.error('Укажите имя файла для анализа результатов. ');
  process.exit(1);
} else{
	fs.readFile(logFilename, options = 'utf8', ((err, data) => {
		if (err) throw err;
		console.log('Содержимое файла:', data);
		let total = JSON.parse(data)
		console.log(`Общее количество партий: ${total.totalGames}`);
		console.log(`"Орлов": ${total.heads}`);
		console.log(`"Решек": ${total.tails}`);
		console.log(`Выигранные партий: ${total.win}`);
		console.log(`Проиграно партий: ${total.loss}`);
		console.log(`Процентовно соотношение выигранных партий: ${(total.win*100) / total.totalGames}%`);
	}));
}
