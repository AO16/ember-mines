import Ember from 'ember';

export default Ember.ArrayController.extend({
	rows: 10,
	cols: 10,
	bombCount: 10,
	bombs: function() {
		var rows = this.get('rows');
		var cols = this.get('cols');
		var bombCount = this.get('bombCount');
		var bombRows = [];

		for (var i = 0; i < rows; i++) {
			var row = [];
			for (var k = 0; k < cols; k++) {
				row.push({
					bomb: false,
					flag: false,
					surroundingBombs: 0
				});
			}
			bombRows.push(row);
		}

		for (var p = 0; p < bombCount; p++) {
			var bombSet = false;

			while(!bombSet) {
				var randRow = randomNum(0, rows - 1);
				var randCol = randomNum(0, cols - 1);

				if (!bombRows[randRow][randCol].bomb) {
					bombRows[randRow][randCol].bomb = true;
					bombSet = true;
					bombRows = updateSurroundingBombs(randRow, randCol, bombRows);
				}
			}
		}

		return bombRows;
	}.property('rows', 'bombCount', 'cols')
});

var randomNum = function (low, high) {
	return Math.floor((Math.random() * high) + low);
};

var updateSurroundingBombs = function(row, col, bombRows) {
	var surroundingBombs = [
		{
			//left
			row: row,
			col: col - 1
		},
		{
			//right
			row: row,
			col: col + 1
		},
		{
			// bottom left
			row: row + 1,
			col: col - 1
		},
		{
			// bottom
			row: row + 1,
			col: col
		},
		{
			// bottom right
			row: row + 1,
			col: col + 1
		},
		{
			// top left
			row: row - 1,
			col: col - 1
		},
		{
			// top
			row: row - 1,
			col: col
		},
		{
			// top right
			row: row - 1,
			col: col + 1
		}
	];

	surroundingBombs.forEach(function(bombProps) {
		var bomb = grabBomb(bombProps.row, bombProps.col, bombRows);

		if (bomb) {
			bomb.surroundingBombs++;
			bombRows[bombProps.row][bombProps.col] = bomb;
		}
	});

	return bombRows;
};

var grabBomb = function(row, col, bombRows) {
	if (row < 0) {
		return null;
	}

	if (col < 0) {
		return null;
	}

	if (row > bombRows.length - 1) {
		return null;
	}

	if (col > bombRows[row].length - 1) {
		return null;
	}

	return bombRows[row][col];
};
