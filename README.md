# ember-switch
[![Build Status](http://api.screwdriver.corp.yahoo.com:4080/badge/40274/component/icon)](http://api.screwdriver.corp.yahoo.com:4080/badge/40274/component/target)
A switch component for ember.

#### Installation:
* This package is available via bower:  `bower install ember-switch`
* Alternatively, you can just download this package and include dist/ember-switch.min.js, and dist/ember-switch.css in your project

#### Usage:
The component takes the following parameters:
* isChecked: (true || false) *// (whether switch is on or off)*
* isDisabled: (true || false) *// (whether switch is enabled or disabled)*
* labelOn: (true || false) *// (the text shown when switch is ON)*
* labelOff: (true || false) *// (the text shown when switch is OFF)*
* hideText: (true || false) *// (will hide the switch text when true)*
* labelPosition: ('left' || 'right') *// right by default. (will position the switch label on left or right)*

**EXAMPLE:**
```javascript
var controller = Em.Controller.extend({
  switchChecked: true,
  switchDisabled: false
});

{{switch-component
labelOn='On'
labelOff='Off'
isCheckedBinding=switchChecked
isDisabledBinding=switchDisabled
labelPosition='left'
}}
```

#### Custom Styling:
You can style this switch by overriding the CSS specified in dist/ember-switch.css
