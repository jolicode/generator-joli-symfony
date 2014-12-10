'use strict';

module.exports = function (grunt) {

    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);
    var app = 'app/Resources';

    // Configuration
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
                    sassDir: app + 'scss',
                    cssDir: '.tmp/css',
                    importPath: app + '/libs',
                    outputStyle: 'expanded',
                    noLineComments: true
                }
            }
        },

        <% } %>

        <% if (gruntSass) { %>

        /**
         * grunt-contrib-sass
         * @see https://github.com/gruntjs/grunt-contrib-sass
         *
         * Compile Sass to CSS using Sass.
         */
        sass: {
            watch: {
                files: [{
                    expand: true,
                    cwd: app + 'scss',
                    src: ['*.scss'],
                    dest: '.tmp/css',
                    ext: '.css'
                }],
                debugInfo: true,
                lineNumbers: true,
                noCache: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: app + 'scss',
                    src: ['*.scss'],
                    dest: '.tmp/css',
                    ext: '.css'
                }],
                noCache: true
            }
        },

        <% } %>

        <% if (gruntTypescript) { %>

        /**
         * grunt-typescript
         * @see https://github.com/k-maru/grunt-typescript
         *
         * Run predefined tasks whenever watched file patterns are added, changed or deleted.
         */
        typescript: {
            base: {
                src: [app + 'ts/*.ts'],
                dest: '.tmp/js',
                options: {
                    module: 'amd', //or commonjs
                    target: 'es5', //or
                    basePath: app + '/ts'
                }
            }
        },

        <% } %>

        <% if (gruntcoffee) { %>
        coffee: {
            compile: {
                files: {
                    '.tmp/app.js': [
                        'src/Acme/DemoBundle/Resources/coffee/app.coffee',
                        'src/Acme/DemoBundle/Resources/coffee/ProjectsManager.coffee'
                    ]
                }
            }
        },

        <% } %>

        <% if (gruntSass || gruntcompass) { %>

        /**
         * grunt-contrib-cssmin
         * @see https://github.com/gruntjs/grunt-contrib-cssmin
         *
         * Run predefined tasks whenever watched file patterns are added, changed or deleted.
         */
        cssmin: {
            combine: {
                options:{
                    report: 'gzip',
                    keepSpecialComments: 0
                },
                files: {
                    'web/built/min.css': [
                        '.tmp/css/**/*.css',
                        app + '/libs/brandymint-fontello/fontello-codes.css'
                    ]
                }
            }
        },

        <% } %>

        <% if (gruntcoffee || gruntTypescript) { %>

        /**
         * grunt-contrib-uglify
         * @see https://github.com/gruntjs/grunt-contrib-uglify
         *
         * Run predefined tasks whenever watched file patterns are added, changed or deleted.
         */
        uglify: {
            options: {
                mangle: false,
                sourceMap: true,
                sourceMapName: 'web/built/app.map'
            },
            dist: {
                files: {
                    'web/built/app.min.js':[
                    app + '/libs/jquery/dist/jquery.js',
                    '.tmp/js/**/*.js'
                    ]
                }
            }
        },

        <% } %>

        <% if (gruntCopy) { %>

        /**
         * grunt-contrib-copy
         * @see https://github.com/gruntjs/grunt-contrib-copy
         *
         * Run predefined tasks whenever watched file patterns are added, changed or deleted.
         */
        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: app + '/libs/Fontello/fonts',
                    dest: 'web/fonts',
                     src: ['**']
                }]
            }
        },

        <% } %>

    });

    /****************************************************************
     * Grunt Task Definitions
     ****************************************************************/

    <% if (gruntTypescript) { %>grunt.registerTask('javascript', ['typescript', 'uglify']);<% } %>
    <% if (gruntcoffee) { %>grunt.registerTask('javascript', ['coffee', 'uglify']);<% } %>
    <% if (gruntcompass) { %>grunt.registerTask('css', ['compass','cssmin']);<% } %>
    <% if (gruntSass) { %>grunt.registerTask('css', ['sass','cssmin']);<% } %>
    <% if (gruntCopy) { %>grunt.registerTask('cp', ['copy']);<% } %>
};
