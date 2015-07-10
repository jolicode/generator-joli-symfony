"use strict";

module.exports = function (grunt) {
<% if (gruntcompass) { %>
  grunt.loadNpmTasks('grunt-contrib-compass');<% } %>
<% if (gruntLess || gruntcompass || gruntBabel) { %>
  grunt.loadNpmTasks('grunt-contrib-watch');<% } %>
<% if (gruntTypescript || gruntcoffee || gruntBabel) { %>
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');<% } %>
<% if (gruntTypescript) { %>
  grunt.loadNpmTasks('grunt-typescript');<% } %>
<% if (gruntcoffee) { %>
  grunt.loadNpmTasks('grunt-contrib-coffee');<% } %>
<% if (gruntLess) { %>
  grunt.loadNpmTasks('grunt-contrib-less');<% } %>
<% if (gruntLess || gruntcompass ||gruntTypescript || gruntcoffee || gruntBabel) { %>
  grunt.loadNpmTasks('grunt-contrib-watch');<% } %>
<% if (gruntBabel) { %>
  grunt.loadNpmTasks('grunt-babel');<% } %>

  var path = {
    app: 'app/Resources',
    assets: 'app/Resources/assets',
    build: 'build',
    bower_components: './bower_components'
  };

  var libSources = [
    path.bower_components + ''
  ];

  var sources = [
    path.build + '/js/*.js'
  ];

  grunt.initConfig({
      <% if (gruntcompass) { %>
      /**
       * grunt-contrib-compass
       * @see https://github.com/gruntjs/grunt-contrib-compass
       *
       * Compile Sass to CSS using Compass.
       */
      compass: {
        sass: {
          options: {
            sourcemap: true,
            sassDir: path.app + '/scss',
            cssDir: 'web/css',
            importPath: path.bower_components,
            imagesDir: 'images',
            imagesPath: path.assets,
            generatedImagesDir: 'web/images',
            outputStyle: 'compressed',
            noLineComments: true
          }
        }
      },<% } %>
      <% if (gruntTypescript) { %>
      /**
       * grunt-typescript
       * @see https://www.npmjs.com/package/grunt-typescript
       *
       * Run predefined tasks whenever watched file patterns are added, changed or deleted.
       */
      typescript: {
        base: {
          src: [path.app + '/js/**/*.ts'],
          dest: 'build/js/typescript.js',
          options: {
            module: 'commonjs', //amd or commonjs
            target: 'es5', //or es3
            sourceMap: true,
            declaration: true
            //watch: true //Detect all target files root. eg: 'path/to/typescript/files/'
          }
        }
      },<% } %>
      <% if (gruntcoffee) { %>
      /**
       * grunt-coffee
       * @see https://www.npmjs.com/package/grunt-coffee
       *
       *  JavaScripts your Coffee
       */
      coffee: {
        compileBare: {
          options: {
            sourceMap: true,
            bare: true,
            join: true
          },
          files: {
            'build/js/coffee.js': [
              path.app + '/js/Checklist.coffee',
              path.app + '/js/ChecklistManager.coffee'
            ]
          }
        }
      },<% } %>
      <% if (gruntcoffee || gruntTypescript || gruntBabel) { %>
      /**
       * grunt-contrib-uglify
       * @see https://github.com/gruntjs/grunt-contrib-uglify
       *
       */
      uglify: {
        options: {
          mangle: false,
          sourceMap : true,
          sourceMapIncludeSources : true
        },
        all: {
          files: {
            'web/js/vendor.min.js': ['build/js/vendor.js'],
            'web/js/app.min.js': ['build/js/app.js'],
            <% if (gruntcoffee) { %>'web/js/coffee.min.js': ['build/js/coffee.js'],<% } %>
            <% if (gruntTypescript) { %>'web/js/typescript.min.js': ['build/js/typescript.js'],<% } %>
          }
        }
      },

      concat: {
        options: {
          sourceMap: true
        },
        dist: {
          files: [{
            src: libSources,
            dest: path.build + '/js/vendor.js'
          }, {
            src: sources,
            dest: path.build + '/js/app.js'
          }]
        }
      },<% } %>
      <% if (gruntLess) { %>
      /**
       * grunt-contrib-less
       * @see https://github.com/gruntjs/grunt-contrib-less
       *
       * Compile Less to CSS.
       */
      less: {
        development: {
          options: {
            compress: true,
            yuicompress: true,
            optimization: 2,
            sourceMap: true
          },
          files: {
            'web/css/less.min.css': path.app + '/less/main.less'
          }
        }
      },<% } %>
      <% if (gruntBabel) { %>
      /**
       * grunt-babel
       * @see https://github.com/gruntjs/grunt-babel
       *
       * Turn ES6 code into vanilla ES5 with no runtime required
       */
      babel: {
        options: {
          sourceMap: true
        },
        dist: {
          files: [{
            cwd: path.app + '/js',
            src: '*.js',
            dest: 'build/js',
            expand: true
          }]
        }
      },<% } %>
      <% if (gruntLess || gruntcompass || gruntBabel) { %>
      /**
       * grunt-watch
       * @see https://github.com/gruntjs/grunt-watch
       *
       */
      watch: {<% if (gruntcompass) { %>
        scss: {
          files: [path.app + '/scss/**/*.scss'],
          tasks: ['css']
        },<% } %><% if (gruntBabel) { %>
        js: {
          files: [path.app + '/js/**/*.js'],
          tasks: ['js']
        },<% } %><% if (gruntLess) { %>
        less: {
          files: [path.app + '/less/**/*.less'],
          tasks: ['less']
        }<% } %>
      }<% } %>
  });

  /****************************************************************
   * Grunt Task Definitions
   ****************************************************************/
  grunt.registerTask('default', [<% if (gruntcoffee || gruntTypescript) { %>'js',<% } %> <% if (gruntcompass || gruntLess) { %>'css'<% } %>]);
  <% if (gruntcoffee || gruntTypescript) { %>grunt.registerTask('js', [<% if (gruntBabel) { %>'babel',<% } %> <% if (gruntTypescript) { %>'typescript',<% } %><% if (gruntcoffee) { %>'coffee',<% } %> 'concat', 'uglify']);<% } %>
  grunt.registerTask('css', [<% if (gruntcompass) { %>'compass',<% } %>]);
};
