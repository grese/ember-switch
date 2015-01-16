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

Ember.TEMPLATES["ember-switch-template-main"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    	<span class='switch-text'>");
  stack1 = helpers._triageMustache.call(depth0, "labelText", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n    ");
  return buffer;
  }

  data.buffer.push("<div class='switch'>\n	");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("checkbox"),
    'classNames': ("switch-checkbox"),
    'checkedBinding': ("isChecked"),
    'disabledBinding': ("isDisabled"),
    'viewName': ("switchCheckbox")
  },hashTypes:{'type': "STRING",'classNames': "STRING",'checkedBinding': "STRING",'disabledBinding': "STRING",'viewName': "STRING"},hashContexts:{'type': depth0,'classNames': depth0,'checkedBinding': depth0,'disabledBinding': depth0,'viewName': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    <label class='switch-label' ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'for': ("switchCheckbox.elementId")
  },hashTypes:{'for': "STRING"},hashContexts:{'for': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n		<div class='switch-inner'></div>\n		<div class='switch-control'></div>\n    </label>\n    ");
  stack1 = helpers.unless.call(depth0, "hideText", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>");
  return buffer;
  
});