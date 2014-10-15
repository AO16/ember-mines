import Ember from 'ember';

export default Ember.View.extend({
	tagName: 'span',
	templateName: 'sweeper-mine',
	blownUp: false,
	mineClass: function() {
		var surroundingBombs = this.get('mine.surroundingBombs');

		if (surroundingBombs === 0) {
			return "black";
		}

		if (surroundingBombs >= 5) {
			return "maroon";
		}

		if (surroundingBombs >= 4) {
			return "dark-blue";
		}

		if (surroundingBombs >= 3) {
			return "red";
		}

		return "green";
	}.property('mine.surroundingBombs'),
	gameOverBomb: function() {
		return this.get('controller.gameOver') && this.get('mine.bomb');
	}.property('controller.gameOver', 'mine.bomb'),
	actions: {
		checkMine: function() {
			if (this.get('controller.gameOver')) {
				return;
			}
			if (this.get('mine.bomb')) {
				this.set('blownUp', true);
				this.set('controller.gameOver', true);
			}
			else {
				this.toggleProperty('mine.checked');
				checkSurroundingMines(this.get('controller.board'), this.get('mine'));
			}
		}
	},
	contextMenu: function(e) {
		e.preventDefault();
		if (this.get('controller.gameOver')) {
			return;
		}
		this.toggleProperty('mine.flag');
	}
});

var checkSurroundingMines = function(board, currentMine) {
	var row = currentMine.get('row.rowNum');
	var col = currentMine.get('colNum');

	var surroundingMines = [
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

	currentMine.set('surroundingBombs', 0);

	surroundingMines.forEach(function(mineProps) {
		grabMine(mineProps.row, mineProps.col, board, function(mine) {
			if (mine && !mine.get('checked')) {
				if (mine.get('bomb')) {
					currentMine.incrementProperty('surroundingBombs');
				}
			}
		});
	});

	currentMine.set('checked', true);

	if (currentMine.get('surroundingBombs') === 0) {
		surroundingMines.forEach(function(mineProps) {
			grabMine(mineProps.row, mineProps.col, board, function(mine) {
				if (mine && !mine.get('checked')) {
					checkSurroundingMines(board, mine);
				}
			});
		});
	}
};

var grabMine = function(row, col, board, cb) {
	var rowObj = board.get('rows').objectAt(row);

	if (!rowObj) {
		return cb(null);
	}

	var mineObj = rowObj.get('mines').objectAt(col);

	if (!mineObj) {
		return cb(null);
	}

	return cb(mineObj);
};
