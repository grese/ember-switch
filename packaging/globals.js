var Writer = require('broccoli-writer');
var fs = require('fs');
var path = require('path');
var Promise = require('RSVP').Promise;
var walk = require('walk-sync');

// TODO(azirbel): Log ember version and register with Ember.libraries?
var Globals = function (inputTree) {
    options = {};
    if (!(this instanceof Globals)) {
        return new Globals(inputTree, options);
    }
    this.inputTree = inputTree;
    this.emberNamespace = 'EmberSwitchComponent';
    this.outputPrefix = 'ember-switch';

    // The old global names aren't consistent: some are on Ember.Table, some on
    // Ember.AddeparMixins, and some just on Ember. For backwards-compatibility
    // we need to maintain the same old names.
    this.globalNameMapping = {
        'ember-switch/components/ember-switch': 'Ember.EmberSwitchComponent'
    };
};

Globals.prototype = Object.create(Writer.prototype);
Globals.prototype.constructor = Globals;

Globals.prototype.write = function(readTree, destDir) {
    var _this = this;

    this.addLinesToOutput = function(output, lines) {
        lines.forEach(function(line) {
            output.push(line);
        });
    };

    return new Promise(function(resolve) {
        readTree(_this.inputTree).then(function(srcDir) {
            var output = [
                "define('ember', ['exports'], function(__exports__) {",
                "  __exports__['default'] = window.Ember;",
                "});",
                "",
                "window.Ember." + _this.emberNamespace + " = Ember.Namespace.create();"];

            // Get a listing of all hbs files from inputTree and make sure each one
            // is registered on Ember.TEMPLATES
            var templateFiles = walk(srcDir).filter(function(f) {
                return /^templates.*js$/.test(f);
            });
            templateFiles.forEach(function(filename) {
                // Add ember-table namespace and remove .js extension
                var filePath = _this.outputPrefix + '/' + filename.slice(0, -3);
                var parts = filePath.split(path.sep);
                output.push("window.Ember.TEMPLATES['" +
                    parts.slice(2).join('/') + "']" +
                    " = require('" + filePath + "')['default'];");
            });

            // Classes to register on the application's container. We need this
            // because we used to refer to views by their full, global name
            // (Ember.Table.HeaderTableContainer), but now we use the view name
            // (header-table-container). So Ember needs to know where to find those
            // views.
            var toRegister = [];

            // Define globals and register on the container
            for (key in _this.globalNameMapping) {
                // Define the global object, like Ember.Table.EmberTableComponent = ...
                output.push("window." + _this.globalNameMapping[key] +
                    " = require('" + key + "')['default'];");
                // Register on the container. We only need to register views and
                // components.
                var type = key.split('/')[1].replace(/s$/, '');
                if (type === 'view' || type === 'component') {
                    toRegister.push({
                        type: type,
                        moduleName: key,
                        containerName: key.split('/')[2]
                    });
                }
            }

            // On loading the ember application, register all views and components on
            // the application's container
            _this.addLinesToOutput(output, [
                "Ember.onLoad('Ember.Application', function(Application) {",
                "Application.initializer({",
                "name: '" + _this.outputPrefix + "',",
                "initialize: function(container) {"
            ]);
            _this.addLinesToOutput(output, toRegister.map(function(item) {
                    return "container.register('" + item.type + ':' + item.containerName +
                        "', require('" + item.moduleName + "')['default']);";
                })
            );
            _this.addLinesToOutput(output, [
                "}",
                "});",
                "});"
            ]);

            // For backwards compatibility, set a layoutName so the component
            // actually renders
            _this.addLinesToOutput(output, [
                "Ember."+ _this.emberNamespace +".reopen({",
                "layoutName: 'components/" + _this.outputPrefix + "'",
                "});"
            ]);

            // Register table-component with handlebars so users can just use
            // {{table-component}}
            output.push("Ember.Handlebars.helper('switch-component', " +
                "Ember." + _this.emberNamespace + ");");

            fs.writeFileSync(path.join(destDir, 'globals-output.js'),
                output.join("\n"));
            resolve();
        });
    });
};

module.exports = Globals;
