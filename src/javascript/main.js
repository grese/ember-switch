(function(){
	'use strict';

	var SwitchComponent = Em.Component.extend({
		layoutName: 'ember-switch-template-main',
		classNames: ['switch-component'],
		isChecked:      false,
		isDisabled:     false,
		labelOn:        'Active',
		labelOff:       'Inactive',
		labelPosition: 'right', // left or right

		labelText: function() {
			return this.get(this.get('isChecked') ? 'labelOn' : 'labelOff');
		}.property('isChecked', 'labelOn', 'labelOff'),
		_positionLeft: function(){
			return this.get('labelPosition').toLowerCase() === 'left';
		}.property('labelPosition'),
		_positionClass: function(){
			switch(this.get('labelPosition')){
				case 'left':
					return 'switch-label-left';
				default:
					return 'switch-label-right';
			}
		}.property('labelPosition')
	});	

	Ember.SwitchComponent = SwitchComponent;
	Ember.Handlebars.helper('switch-component', Ember.SwitchComponent);
}(this));