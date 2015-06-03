/*!
* ember-switch v1.0.0
*/
(function(){;
var define, requireModule, require, requirejs;

(function() {

  var _isArray;
  if (!Array.isArray) {
    _isArray = function (x) {
      return Object.prototype.toString.call(x) === "[object Array]";
    };
  } else {
    _isArray = Array.isArray;
  }

  var registry = {}, seen = {};
  var FAILED = false;

  var uuid = 0;

  function tryFinally(tryable, finalizer) {
    try {
      return tryable();
    } finally {
      finalizer();
    }
  }

  function unsupportedModule(length) {
    throw new Error("an unsupported module was defined, expected `define(name, deps, module)` instead got: `" + length + "` arguments to define`");
  }

  var defaultDeps = ['require', 'exports', 'module'];

  function Module(name, deps, callback, exports) {
    this.id       = uuid++;
    this.name     = name;
    this.deps     = !deps.length && callback.length ? defaultDeps : deps;
    this.exports  = exports || { };
    this.callback = callback;
    this.state    = undefined;
    this._require  = undefined;
  }


  Module.prototype.makeRequire = function() {
    var name = this.name;

    return this._require || (this._require = function(dep) {
      return require(resolve(dep, name));
    });
  }

  define = function(name, deps, callback) {
    if (arguments.length < 2) {
      unsupportedModule(arguments.length);
    }

    if (!_isArray(deps)) {
      callback = deps;
      deps     =  [];
    }

    registry[name] = new Module(name, deps, callback);
  };

  // we don't support all of AMD
  // define.amd = {};
  // we will support petals...
  define.petal = { };

  function Alias(path) {
    this.name = path;
  }

  define.alias = function(path) {
    return new Alias(path);
  };

  function reify(mod, name, seen) {
    var deps = mod.deps;
    var length = deps.length;
    var reified = new Array(length);
    var dep;
    // TODO: new Module
    // TODO: seen refactor
    var module = { };

    for (var i = 0, l = length; i < l; i++) {
      dep = deps[i];
      if (dep === 'exports') {
        module.exports = reified[i] = seen;
      } else if (dep === 'require') {
        reified[i] = mod.makeRequire();
      } else if (dep === 'module') {
        mod.exports = seen;
        module = reified[i] = mod;
      } else {
        reified[i] = requireFrom(resolve(dep, name), name);
      }
    }

    return {
      deps: reified,
      module: module
    };
  }

  function requireFrom(name, origin) {
    var mod = registry[name];
    if (!mod) {
      throw new Error('Could not find module `' + name + '` imported from `' + origin + '`');
    }
    return require(name);
  }

  function missingModule(name) {
    throw new Error('Could not find module ' + name);
  }
  requirejs = require = requireModule = function(name) {
    var mod = registry[name];


    if (mod && mod.callback instanceof Alias) {
      mod = registry[mod.callback.name];
    }

    if (!mod) { missingModule(name); }

    if (mod.state !== FAILED &&
        seen.hasOwnProperty(name)) {
      return seen[name];
    }

    var reified;
    var module;
    var loaded = false;

    seen[name] = { }; // placeholder for run-time cycles

    tryFinally(function() {
      reified = reify(mod, name, seen[name]);
      module = mod.callback.apply(this, reified.deps);
      loaded = true;
    }, function() {
      if (!loaded) {
        mod.state = FAILED;
      }
    });

    var obj;
    if (module === undefined && reified.module.exports) {
      obj = reified.module.exports;
    } else {
      obj = seen[name] = module;
    }

    if (obj !== null &&
        (typeof obj === 'object' || typeof obj === 'function') &&
          obj['default'] === undefined) {
      obj['default'] = obj;
    }

    return (seen[name] = obj);
  };

  function resolve(child, name) {
    if (child.charAt(0) !== '.') { return child; }

    var parts = child.split('/');
    var nameParts = name.split('/');
    var parentBase = nameParts.slice(0, -1);

    for (var i = 0, l = parts.length; i < l; i++) {
      var part = parts[i];

      if (part === '..') {
        if (parentBase.length === 0) {
          throw new Error('Cannot access parent module of root');
        }
        parentBase.pop();
      } else if (part === '.') { continue; }
      else { parentBase.push(part); }
    }

    return parentBase.join('/');
  }

  requirejs.entries = requirejs._eak_seen = registry;
  requirejs.clear = function(){
    requirejs.entries = requirejs._eak_seen = registry = {};
    seen = state = {};
  };
})();

;define("ember-switch/components/ember-switch", 
  ["ember","ember-switch/templates/components/ember-switch","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Em = __dependency1__["default"];
    var layout = __dependency2__["default"];
    __exports__["default"] = Em.Component.extend({
        layout: layout,
        classNames: ['switch-component'],
        isChecked:      false,
        isDisabled:     false,
        labelOn:        'Active',
        labelOff:       'Inactive',
        labelPosition: 'right', // left or right
        labelText: Em.computed('isChecked', 'labelOn', 'labelOff', function(){
            return this.get(this.get('isChecked') ? 'labelOn' : 'labelOff');
        }),
        _positionLeft: Em.computed('labelPosition', function(){
            return this.get('labelPosition').toLowerCase() === 'left';
        }),
        _positionClass: Em.computed('labelPosition', function(){
            switch(this.get('labelPosition')){
                case 'left':
                    return 'switch-label-left';
                default:
                    return 'switch-label-right';
            }
        })
    });
  });
;define("ember-switch/templates/components/ember-switch", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
    /**/) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1, helper, options, self=this, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;

    function program1(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        ");
      stack1 = helpers.unless.call(depth0, "hideText", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    ");
      return buffer;
      }
    function program2(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n            <span class='switch-text'>");
      stack1 = helpers._triageMustache.call(depth0, "labelText", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</span>\n        ");
      return buffer;
      }

      data.buffer.push("<div ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":switch _positionClass")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">\n    ");
      stack1 = helpers['if'].call(depth0, "_positionLeft", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    ");
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
      data.buffer.push(">\n        <div class='switch-inner'></div>\n        <div class='switch-control'></div>\n    </label>\n    ");
      stack1 = helpers.unless.call(depth0, "_positionLeft", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n</div>\n");
      return buffer;
      
    });
  });
;define('ember', ['exports'], function(__exports__) {
  __exports__['default'] = window.Ember;
});

window.Ember.EmberSwitchComponent = Ember.Namespace.create();
window.Ember.TEMPLATES['components/ember-switch'] = require('ember-switch/templates/components/ember-switch')['default'];
window.Ember.EmberSwitchComponent = require('ember-switch/components/ember-switch')['default'];
Ember.onLoad('Ember.Application', function(Application) {
Application.initializer({
name: 'ember-switch',
initialize: function(container) {
container.register('component:ember-switch', require('ember-switch/components/ember-switch')['default']);
}
});
});
Ember.EmberSwitchComponent.reopen({
layoutName: 'components/ember-switch'
});
Ember.Handlebars.helper('switch-component', Ember.EmberSwitchComponent);})();