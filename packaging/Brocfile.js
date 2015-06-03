/* jshint node: true */

var mergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');
// TODO(azirbel): This is deprecated
var pickFiles = require('broccoli-static-compiler');
// TODO(azirbel): Deprecated, remove and use es6modules
var compileES6 = require('broccoli-es6-concatenator');
var ES6Modules = require('broccoli-es6modules');
var es3Safe = require('broccoli-es3-safe-recast');
var templateCompiler = require('broccoli-ember-hbs-template-compiler');
var less = require('broccoli-less-single');
var wrap = require('./wrap');
var globals = require('./globals');

var namespace = 'ember-switch';

var addonTree = pickFiles('addon', {
    srcDir: '/',
    destDir: namespace
});

// Compile templates
var templateTree = templateCompiler('addon/templates', { module: true });
templateTree = pickFiles(templateTree, {srcDir: '/', destDir: namespace + '/templates'});

var sourceTree = mergeTrees([templateTree, addonTree], {overwrite: true});

// Does a few things:
//   - Generate global exports, like Ember.Table.EmberTableComponent
//   - Register all templates on Ember.TEMPLATES
//   - Register views and components with the container so they can be looked up
// Output goes into globals-output.js
var globalExports = globals(pickFiles(sourceTree, {srcDir: '/' + namespace, destDir: '/'}));

// Require.js module loader
var loader = pickFiles('bower_components', {srcDir: '/loader.js', destDir: '/'});

var jsTree = mergeTrees([sourceTree, globalExports, loader]);

// Transpile modules
var compiled = compileES6(jsTree, {
    wrapInEval: false,
    loaderFile: 'loader.js',
    inputFiles: [namespace + '/**/*.js'],
    ignoredModules: ['ember'],
    outputFile: '/' + namespace + '.js',
    legacyFilesToAppend: ['globals-output.js']
});

// Wrap in a function which is executed
compiled = wrap(compiled);

// Compile LESS
var lessTree = pickFiles('addon/styles', { srcDir: '/', destDir: '/' });
var lessMain = 'addon.less';
var lessOutput = namespace + '.css';
lessTree = less(lessTree, lessMain, lessOutput);

module.exports = mergeTrees([es3Safe(compiled), lessTree]);
