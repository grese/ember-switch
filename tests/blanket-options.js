/*globals blanket, module */
var isPhantom = (typeof exports !== 'undefined'),
    coverageDir = './artifacts/coverage/',
    coverageFile = 'lcov.info',
    outputFile = coverageDir + coverageFile;

if(isPhantom && process.env.COVERAGE_DIR){
    outputFile = process.env.COVERAGE_DIR + '/' + coverageFile;
}

var options = {
    modulePrefix: "ember-switch",
    filter: "//.*ember-switch/.*/",
    antifilter: "//.*(tests|template).*/",
    loaderExclusions: [],
    enableCoverage: true,
    cliOptions: {
        reporters: ['lcov'],
        autostart: true,
        lcovOptions: {
            outputFile: outputFile
        }
    }
};
if(isPhantom){
    module.exports = options;
}else{
    blanket.options(options);
}
