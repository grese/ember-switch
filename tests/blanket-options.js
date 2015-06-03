/*globals blanket, module */
var options = {
    modulePrefix: "ember-switch",
    filter: "//.*ember-switch/.*/",
    antifilter: "//.*(tests|template).*/",
    loaderExclusions: [],
    enableCoverage: true,
    cliOptions: {
        reporters: ['json']
    }
};
if (typeof exports === 'undefined') {
    blanket.options(options);
} else {
    module.exports = options;
}
