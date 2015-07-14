'use strict';

exports.config = {
  paths: {
    'public': 'web',
    'watched': ['app/Resources']
  },
  files: {
    javascripts: {
      joinTo: {
        'js/app.js': /^app/,
        'js/vendor.js': /^(?!app)/,
      }
    },
    stylesheets: {
      joinTo: 'css/style.css'
    }
  },
  conventions: {
    ignored: [
      /\/_/, // File begining by "_" like _settings.scss
      // Brunch does include all Bower components by default, we blacklist unneeded ones.
      //'bower_components/foundation/'
    ],
    assets: /^app\/Resources\/assets/
  },
  plugins: {
    <% if (babelBrunch) { %>
    babel: {
      pattern: /\.(js|jsx)$/
    },<% } %><% if (sassBrunch) { %>
    sass: {
      allowCache: true
    },<% } %><% if (uglifyJsBrunch) { %>
    uglify: {
      mangle: true,
      compress: {
        global_defs: {
          DEBUG: false
        }
      }
    },<% } %><% if (typescriptBrunch) { %>
    Typescript: {
      tscArgs: '--module commonjs'
    },<% } %>
    cleancss: {
      keepSpecialComments: 0,
      removeEmpty: true
    }
  }
};