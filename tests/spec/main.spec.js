
// Set the component:
App.SwitchComponentComponent = Ember.SwitchComponent.extend({
	layoutName: null,
	layout: Ember.TEMPLATES['ember-switch-template-main']
});

var labelOnText = 'LABEL ON',
	labelOffText = 'LABEL OFF';

moduleForComponent('switch-component', 'Switch Component', {});

test('the switch should render', function() {
	var component = this.subject(),
		$component = this.append(),
		switchRendered = false;
	Em.run(function(){
		switchRendered = $component.find('div.switch').length === 1;
		equal(switchRendered, true, 'the switch should render');
	});
});

test('the switch should not have labelText when hideText is true', function() {
	var component = this.subject({
			hideText: true
		}),
		$component = this.append(),
		noText = false;
	Em.run(function(){
		noText = $component.find('.switch-text').length === 0;
		equal(noText, true, 'switch should not have labelText');
	});
});

test('the switch should have labelText when hideText is false', function() {
	var component = this.subject(),
		$component = this.append(),
		hasText = false;
	Em.run(function(){
		hasText = $component.find('.switch-text').length === 1;
		equal(hasText, true, 'switch should have labelText element');
	});
});

test('the switch should initialize with labelOn text when isChecked is true on init', function() {
	var component = this.subject({
			labelOn: labelOnText,
			isChecked: true
		}),
		$component = this.append(),
		text = null;
	Em.run(function(){
		text = $component.find('.switch-text').text();
		equal(text, labelOnText, 'switch should have labelOn text');
	});
});

test('the switch should initialize with labelOff text when isChecked is false on init', function() {
	var component = this.subject({
			labelOff: labelOffText,
			isChecked: false
		}),
		$component = this.append(),
		text = null;
	Em.run(function(){
		text = $component.find('.switch-text').text();
		equal(text, labelOffText, 'switch should have labelOff text');
	});
});

test('the switch checkbox should be disabled when isDisabled is true.', function() {
	var component = this.subject({
			isDisabled: true
		}),
		$component = this.append(),
		disabled = false;
	Em.run(function(){
		disabled = $component.find('input.switch-checkbox').attr('disabled');
		equal(disabled, 'disabled', 'the input should be disabled');
	});
});

test('the switch checkbox should NOT be disabled when isDisabled is false.', function() {
	var component = this.subject(),
		$component = this.append(),
		disabled = true;
	Em.run(function(){
		disabled = $component.find('input.switch-checkbox').attr('disabled');
		strictEqual(disabled, undefined, 'the input should NOT be disabled');
	});
});

test('the switch label should have a for attribute that points to the checkbox', function() {
	var component = this.subject(),
		$component = this.append();
	Em.run(function(){
		var id = $component.find('input.switch-checkbox').attr('id'),
			forAttr = $component.find('label.switch-label').attr('for');
		strictEqual(forAttr, id);
	});
});