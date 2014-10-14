import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'span',
	hasClicked: false,
	click: function() {
		if (this.get('content.bomb')) {
			alert('Boom!');
		}
		else {
			this.toggleProperty('hasClicked');
		}
	},
	contextMenu: function(e) {
		e.preventDefault();
		this.toggleProperty('content.flag');
	}
});
