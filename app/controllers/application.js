import Ember from 'ember';

export default Ember.ArrayController.extend({
	rows: 20,
	cols: 20,
	bombCount: 50,
	board: function() {
		return createBoard(this);
	}.property('rows', 'bombCount', 'cols'),
	actions: {
		resetGame: function() {
			this.set('board', createBoard(this));
			this.set('gameOver', false);
		}
	}
});

var createBoard = function(self) {
	var rows = self.get('rows');
	var cols = self.get('cols');
	var bombCount = self.get('bombCount');

	var board = self.store.createRecord('board');

	for (var i = 0; i < rows; i++) {
		var rowObj = self.store.createRecord('row', {
			rowNum: i
		});
		for (var k = 0; k < cols; k++) {
			var mineObj = self.store.createRecord('mine', {
				bomb: false,
				flag: false,
				surroundingBombs: 0,
				checked: false,
				colNum: k
			});
			rowObj.get('mines').pushObject(mineObj);
		}
		board.get('rows').pushObject(rowObj);
	}

	for (var p = 0; p < bombCount; p++) {
		var bombSet = false;

		while(!bombSet) {
			var randRow = randomNum(0, rows - 1);
			var randCol = randomNum(0, cols - 1);

			var randRowObj = board.get('rows').objectAt(randRow);
			var randMineObj = randRowObj.get('mines').objectAt(randCol);

			if (!randMineObj.get('bomb')) {
				randMineObj.set('bomb', true);
				bombSet = true;
			}
		}
	}

	return board;
}

var randomNum = function (low, high) {
	return Math.floor((Math.random() * high) + low);
};
