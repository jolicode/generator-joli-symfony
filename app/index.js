'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');
var yaml = require('js-yaml');
var fs = require('fs-extra');
var rmdir = require('rimraf');
var child_process = require('child_process');
var http = require('http');
var _ = require('lodash');
var Download = require('download');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
    var Jolicode = '\n        ' + chalk.yellow('##') + '       ##            ##  ##   #######                   ##                ' + chalk.yellow('##') + '  ' + chalk.yellow('##') + '  \n      ' + chalk.yellow('##') + '         ##            ##      ##     ##                  ##               ' + chalk.yellow('##') + '    ' + chalk.yellow('##') + '  \n     ' + chalk.yellow('##') + '          ##   ######   ##  ##  ##          ######    #######   ######     ' + chalk.yellow('##') + '      ' + chalk.yellow('##') + '  \n     ' + chalk.yellow('##') + '          ##  ##    ##  ##  ##  ##         ##    ##  ##    ##  ########   ' + chalk.yellow('##') + '       ' + chalk.yellow('##') + '  \n      ' + chalk.yellow('##') + '  ##    ###  ##    ##  ##  ##  ##     ##  ##    ##  ##    ##  ##        ' + chalk.yellow('##') + '       ' + chalk.yellow('##') + '  \n       ' + chalk.yellow('##') + '   #####     ######   ##  ##   #######    ######    #######   ######  ' + chalk.yellow('##') + '       ' + chalk.yellow('##');
    var JolicodeDesc = '\n\n   A Yeoman generator for the Symfony2 framework\n\n   Created by ' + chalk.yellow('@JoliCode ') + ' & ' + chalk.blue('@lbrunet_com') + '\n   ' + chalk.cyan('http://jolicode.com/') + '\n';
    this.log(Jolicode);
    this.log(JolicodeDesc);
  },

  askSymfonyStandard: function () {
    var done = this.async();

    this.SymfonyStandardDistribution = {
      host: 'http://symfony.com/download?v=Symfony_Standard_Vendors_',
      commit: '2.7',
      ext: 'zip'
    };

    var prompts = [{
      type: 'confirm',
      name: 'symfonyStandard',
      message: 'Would you like to use the Symfony "Standard Edition" distribution ' + this.SymfonyStandardDistribution.commit,
      default: true
    }];

    this.prompt(prompts, function (answers) {
      if (answers.symfonyStandard) {
        this.symfonyDistribution = this.SymfonyStandardDistribution;
      } else {
        this.symfonyDistribution = null;
      }
      done();
    }.bind(this));
  },

  askSymfonyCustom: function () {
    if (this.symfonyDistribution === null) {
      var done = this.async();

      console.log('Please provide GitHub details of the Symfony distribution you would like to use.');
      console.log('e.g. http://github.com/symfony/symfony-standard/tree/[commit].');

      var prompts = [{
        type: 'list',
        name: 'symfonyCommit',
        message: 'Commit (commit/branch/tag)',
        default: '2.7',
        choices: ['2.3', '2.6', '2.7']
      }];

      this.prompt(prompts, function (answers) {

        var repo = 'https://github.com/' + 'symfony' + '/' + 'symfony-standard' + '/tree/' + answers.symfonyCommit;
        console.log('Thanks! I\'ll use ' + repo);
        console.log('');

        this.symfonyDistribution = {
          host: 'http://symfony.com/download?v=Symfony_Standard_Vendors_',
          commit: answers.symfonyCommit,
          ext: 'zip'
        };

        done();
      }.bind(this));
    }
  },

  getTagSymfony: function () {
    var version = this.symfonyDistribution.commit;
    var done = this.async();

    http.get('http://symfony.com/versions.json', function (res) {
      var data = '';

      res.on('data', function (d) {
        data += d;
      });

      res.on('error', function (e) {
        console.log('Got error: ' + e.message);
      });

      res.on('end', function () {
        var parsed = JSON.parse(data);
        this.symfonyDistribution.commit = parsed[version];
        done();
      }.bind(this));
    }.bind(this));
  },

  askToolsExtension: function () {
    var done = this.async();
    var prompts = [{
      type: 'list',
      name: 'toolsExtension',
      message: 'Which tools would you like to use?',
      default: 'gulp',
      choices: ['grunt', 'gulp', 'brunch']
    }];
    this.prompt(prompts, function (answers) {
      this.toolsExtension = answers.toolsExtension;
      done();
    }.bind(this));
  },

  askGruntCustom: function () {
    if (this.toolsExtension === 'grunt') {
      var done = this.async();

      var prompts = [{
        type: 'checkbox',
        name: 'gruntCustom',
        message: 'Customize Gruntfile',
        choices: [
          {
            name: 'grunt-compass',
            value: 'gruntCompass',
            checked: true
          },
          {
            name: 'grunt-less',
            value: 'gruntLess',
            checked: false
          },
          {
            name: 'grunt-babel',
            value: 'gruntBabel',
            checked: true
          },
          {
            name: 'grunt-coffee',
            value: 'gruntCoffee',
            checked: false
          },
          {
            name: 'grunt-typescript',
            value: 'gruntTypescript',
            checked: true
          }
        ]
      }];

      this.prompt(prompts, function (answers) {
        function hasFeature(feat) {
          return answers.gruntCustom.indexOf(feat) !== -1;
        }

        this.gruntcompass = hasFeature('gruntCompass');
        this.gruntcoffee = hasFeature('gruntCoffee');
        this.gruntTypescript = hasFeature('gruntTypescript');
        this.gruntLess = hasFeature('gruntLess');
        this.gruntBabel = hasFeature('gruntBabel');

        done();
      }.bind(this));
    }
  },

  askGulpCustom: function () {
    if (this.toolsExtension === 'gulp') {
      var done = this.async();

      var prompts = [{
        type: 'checkbox',
        name: 'gulpCustom',
        message: 'Customize Gulpfile',
        choices: [
          {
            name: 'gulp-ruby-sass',
            value: 'gulpRubySass',
            checked: true
          },
          {
            name: 'gulp-copy',
            value: 'gulpCopy',
            checked: false
          },
          {
            name: 'gulp-javascript',
            value: 'gulpConcat',
            checked: false
          },
          {
            name: 'gulp-less',
            value: 'gulpLess',
            checked: false
          },
          {
            name: 'gulp-babel',
            value: 'gulpBabel',
            checked: true
          },
          {
            name: 'gulp-typescript',
            value: 'gulpTypescript',
            checked: false
          },
          {
            name: 'gulp-coffee',
            value: 'gulpCoffee',
            checked: false
          }
        ]
      }];

      this.prompt(prompts, function (answers) {
        function hasFeature(feat) {
          return answers.gulpCustom.indexOf(feat) !== -1;
        }

        this.gulpRubySass = hasFeature('gulpRubySass');
        this.gulpCopy = hasFeature('gulpCopy');
        this.gulpConcat = hasFeature('gulpConcat');
        this.gulpLess = hasFeature('gulpLess');
        this.gulpBabel = hasFeature('gulpBabel');
        this.gulpTypescript = hasFeature('gulpTypescript');
        this.gulpCoffee = hasFeature('gulpCoffee');

        done();
      }.bind(this));
    }
  },

  askBrunchCustom: function () {
    if (this.toolsExtension === 'brunch') {
      var done = this.async();

      var prompts = [{
        type: 'checkbox',
        name: 'brunchCustom',
        message: 'Customize Brunch',
        choices: [
          {
            name: 'less-brunch',
            value: 'lessBrunch',
            checked: false
          },
          {
            name:  'sass-brunch',
            value: 'sassBrunch',
            checked: true
          },
          {
            name: 'stylus-brunch',
            value: 'stylusBrunch',
            checked: false
          },
          {
            name: 'coffee-script-brunch',
            value: 'coffeeScriptBrunch',
            checked: false
          },
          {
            name: 'typescript-brunch',
            value: 'typescriptBrunch',
            checked: false
          },
          {
            name: 'uglify-js-brunch',
            value: 'uglifyJsBrunch',
            checked: true
          },
          {
            name: 'babel-brunch',
            value: 'babelBrunch',
            checked: true
          }
        ]
      }];

      this.prompt(prompts, function (answers) {
        function hasFeature(feat) {
          return answers.brunchCustom.indexOf(feat) !== -1;
        }

        this.lessBrunch = hasFeature('lessBrunch');
        this.sassBrunch = hasFeature('sassBrunch');
        this.stylusBrunch = hasFeature('stylusBrunch');
        this.coffeeScriptBrunch = hasFeature('coffeeScriptBrunch');
        this.typescriptBrunch = hasFeature('typescriptBrunch');
        this.uglifyJsBrunch = hasFeature('uglifyJsBrunch');
        this.babelBrunch = hasFeature('babelBrunch');

        done();
      }.bind(this));
    }
  },

  askBootStrapSass: function () {
    var done = this.async();

    var prompts = [{
      type: 'confirm',
      name: 'bootStrapSass',
      message: 'Would you like to use "BootStrap Sass"?',
      default: true
    }];

    this.prompt(prompts, function (answers) {
      this.bootStrapSass = answers.bootStrapSass;
      done();
    }.bind(this));
  },

  askbundle: function () {
    var done = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'addBundle',
      message: 'Which bundle would you like to use?',
      choices: [
      {
        name: 'DoctrineFixturesBundle',
        value: 'fixturebundle',
        checked: true
      },
      {
        name: 'DoctrineMigrationsBundle',
        value: 'migrationbundle',
        checked: false
      }
      ]

    }];

    this.prompt(prompts, function (answers) {
      function hasFeature(feat){
        return answers.addBundle.indexOf(feat) !== -1;
      }

      this.fixturebundle = hasFeature('fixturebundle');
      this.migrationbundle = hasFeature('migrationbundle');
      done();
    }.bind(this));
  },

  _unzip: function (archive, destination, opts, cb) {
    if (_.isFunction(opts) && !cb) {
      cb = opts;
      opts = { extract: true };
    }

    opts = _.assign({ extract: true }, opts);

    var log = this.log.write()
      .info('... Fetching %s ...', archive)
      .info(chalk.yellow('This might take a few moments'));

    var download = new Download(opts)
      .get(archive)
      .dest(destination)
      .use(function (res) {
        res.on('data', function () {});
      });

    download.run(function (err) {
      if (err) {
        return cb (err);
      }

      log.write().ok('Done in ' + destination).write();
      cb();
    });
  },

  symfonyBase: function () {
    var done = this.async();
    var appPath = this.destinationRoot();
    var repo = this.symfonyDistribution.host + this.symfonyDistribution.commit  + '.' + this.symfonyDistribution.ext;

    this._unzip(repo, appPath, function (err, remote) {
      if (err) {
        return done(err);
      } else {
        console.log(' 👍 ' + chalk.green(' Download success ! '));
        done();
      }
    });
  },

  moveSymfonyBase: function () {
    var done = this.async();
    var directory = this.destinationRoot() + '/Symfony';
    this.directory(directory, '.');
    fs.move('./Symfony/', '.', function (err) {
      done();
    });
  },

  installComposer: function () {
    var done = this.async();
    this.pathComposer = 'php ./composer.phar';
    child_process.exec('php -r "readfile(\'https://getcomposer.org/installer\');" | php', function (error, stdout, stderr) {
      console.log(chalk.green('Installing composer locally.'));
      console.log('See ' + chalk.yellow('http://getcomposer.org')  + ' for more details on composer.');
      console.log('');
      done();
    });
  },

  checkBower: function () {
    this.globalBower = false;

    if (this.bootStrapSass) {
      var done = this.async();

      child_process.execFile('bower', ['-v'], function (error, stdout, stderr) {
        if (error !== null) {
          var prompts = [{
            type: 'confirm',
            name: 'checkBower',
            message: chalk.red('WARNING: No global bower installation found. We will install it locally if you decide to continue. Continue ?'),
            default: true
          }];
          this.prompt(prompts, function (answers) {
            if (answers.checkBower) {
              child_process.exec('npm install -g bower', function (error, stdout, stderr) {
                if (error !== null) {
                  console.log('exec error: ' + error);
                } else {
                  console.log(chalk.green('Installing bower locally.'));
                  console.log('See ' + chalk.yellow('http://bower.io/') + ' for more details on bower.');
                  console.log('');
                  this.globalBower = true;
                  done();
                }
              }.bind(this));
            } else {
              console.log(chalk.red('Bower did not installed locally!'));
              done();
            }
          }.bind(this));
        } else {
          this.globalBower = true;
          done();
        }
      }.bind(this));
    }
  },

  writing: {
    removeSymfonyBase: function () {
      var done = this.async();
      var directory = this.destinationRoot() + '/Symfony';
      rmdir(directory, function (error) {
        if (null === error) {
          done();
        }
      });
    },

    app: function () {
      if (this.toolsExtension === 'grunt') {
        this.template('_Gruntfile.js', 'Gruntfile.js');
      }
      if (this.toolsExtension === 'gulp') {
        this.template('_Gulpfile.js', 'Gulpfile.js');
      }
      if (this.toolsExtension === 'brunch') {
        this.template('_brunch-config.js', 'brunch-config.js');
      }
      if (this.gruntcompass || this.gulpRubySass || this.sassBrunch) {
        this.directory('./demo/scss', 'app/Resources/scss');
      }
      if (this.gruntLess || this.gulpLess || this.lessBrunch) {
        this.directory('./demo/less', 'app/Resources/less');
      }
      if (this.stylusBrunch) {
        this.directory('./demo/styl', 'app/Resources/styl');
      }
      if (this.gruntcoffee || this.gulpCoffee || this.coffeeScriptBrunch) {
        this.directory('./demo/coffee', 'app/Resources/js');
      }
      if (this.gruntBabel || this.gulpBabel || this.babelBrunch) {
        this.directory('./demo/es6', 'app/Resources/js');
      }
      if (this.uglifyJsBrunch || this.gulpConcat) {
        this.directory('./demo/js', 'app/Resources/js');
      }
      if (this.gruntTypescript || this.gulpTypescript || this.typescriptBrunch) {
        this.directory('./demo/ts', 'app/Resources/js');
      }
      this.fs.copy(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore')
      );
      this.template('_bower.json', 'bower.json');
      this.template('_package.json', 'package.json');
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: {
    installComponents: function () {
      this.installDependencies({
        bower: this.globalBower,
        npm: true,
        skipInstall: false
      });
    }
  },

  end: {
    addBootStrapSass: function () {
      if (this.bootStrapSass && this.globalBower) {
        child_process.exec('bower install bootstrap-sass-official --save', function (error, stdout, stderr) {
          if (error !== null) {
            console.log('exec error: ' + error);
          } else {
            console.log(chalk.green('[bootstrap-sass-official] installed!'));
          }
        });
      }
    },

    cleanConfig: function () {
      var confDev = yaml.safeLoad(fs.readFileSync('app/config/config_dev.yml'));
      delete confDev.assetic;
      var newConfDev = yaml.dump(confDev, {indent: 4});
      fs.writeFileSync('app/config/config_dev.yml', newConfDev);

      var conf = yaml.safeLoad(fs.readFileSync('app/config/config.yml'));
      delete conf.assetic;
      var newConf = yaml.dump(conf, {indent: 4});
      fs.writeFileSync('app/config/config.yml', newConf);
    },

    updateAppKernel: function () {
      var appKernelPath = 'app/AppKernel.php';
      var appKernelContents = this.readFileAsString(appKernelPath);

      var newAppKernelContents = appKernelContents.replace('new Symfony\\Bundle\\AsseticBundle\\AsseticBundle(),', '');
      fs.writeFileSync(appKernelPath, newAppKernelContents);
    },

    cleanComposer: function () {
      var removeAssetic = this.pathComposer + ' remove ' + 'symfony/assetic-bundle';

      child_process.exec(removeAssetic, function (error, stdout, stderr) {
        if (error !== null) {
          console.log('exec error: ' + error);
        } else {
          console.log(chalk.green('[symfony/assetic-bundle] deleted!'));
        }
      });
    },

    addBundleComposer: function () {
      var fixturebundle = this.pathComposer + ' require ' + 'doctrine/doctrine-fixtures-bundle';
      var migrationbundle = this.pathComposer + ' require ' + 'doctrine/doctrine-migrations-bundle';

      if (this.fixturebundle) {
        child_process.exec(fixturebundle, function (error, stdout, stderr) {
          if (error !== null) {
            console.log('exec error: ' + error);
          } else {
            console.log(chalk.green('[doctrine-fixtures-bundle] installed!'));
          }
        });
      }

      if (this.migrationbundle) {
        child_process.exec(migrationbundle, function (error, stdout, stderr) {
          if (error !== null) {
            console.log('exec error: ' + error);
          } else {
            console.log(chalk.green('[doctrine-migrations-bundle] installed!'));
          }
        });
      }
    }
  }
});
