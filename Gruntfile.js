module.exports = function (grunt) {
  'use strict';

  var path = require('path');

  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-broccoli');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-release-it');
  grunt.loadNpmTasks('grunt-text-replace');

  // TODO(azirbel): We should register Ember Table, with its version, to Ember.Libraries

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n* <%=pkg.name %> v<%=pkg.version%>\n*/',

    broccoli: {
      dist: {
        dest: 'dist',
        config: 'packaging/Brocfile.js'
      }
    },

    clean: ['tmp', 'ember-dist', 'node_modules', 'bower_components'],

    replace: {
      // The VERSION file for easy reference of the current version
      global_version: {
        src: ['VERSION'],
        overwrite: true,
        replacements: [{
          from: /.*\..*\..*/,
          to: '<%=pkg.version%>'
        }]
      },
      // On the project homepage, there is a reference to the CHANGELOG and
      // listing of the project's current version.
      overview_page: {
        src: ['tests/dummy/app/templates/overview.hbs'],
        overwrite: true,
        replacements: [{
          from: /The current version is .*\..*\..*\./,
          to: "The current version is <%=pkg.version%>."
        }]
      }
    },

    uglify: {
      file: {
        options: {
          preserveComments: false,
          beautify: false,
          mangle: true,
          report: 'min'
        },

        files: {
          './dist/<%=pkg.name %>.min.js': ['./dist/<%=pkg.name %>.js']
        }
      }
    },

    // Add a banner to dist files which includes version & year of release
    usebanner: {
      js: {
        options: {
          banner: '<%=banner%>'
        },
        files: {
          src: ['dist/*.js']
        }
      },
      css: {
        options: {
          banner: '<%=banner%>'
        },
        files: {
          src: ['dist/*.css']
        }
      }
    },

    'release-it': {
      options: {
        'pkgFiles': ['package.json', 'bower.json'],
        'commitMessage': 'Release %s',
        'tagName': 'v%s',
        'tagAnnotation': 'Release %s',
        'increment': 'patch',
        'buildCommand': 'grunt dist && ember build --environment="gh-pages"',
        'distRepo': '-b gh-pages git@git.corp.yahoo.com:media-publishing/ember-switch',
        'distStageDir': '.stage',
        'distBase': 'ember-dist',
        'distFiles': ['**/*'],
        'publish': false
      }
    }
  });

  grunt.registerTask("dist", ["broccoli:dist:build", "uglify", "usebanner"]);
  grunt.registerTask("default", ["dist"]);
};
