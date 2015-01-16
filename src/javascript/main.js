(function(){
	'use strict';

	var SwitchComponent = Em.Component.extend({
		layoutName: 'ember-switch-template-main',
		classNames: ['switch-component'],
		isChecked:      false,
		isDisabled:     false,
		labelOn:        'Active',
		labelOff:       'Inactive',

		labelText: function() {
			return this.get(this.get('isChecked') ? 'labelOn' : 'labelOff');
		}.property('isChecked', 'labelOn', 'labelOff')
	});	

	Ember.SwitchComponent = SwitchComponent;
	Ember.Handlebars.helper('switch-component', Ember.SwitchComponent);
}(this));