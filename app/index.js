'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
    var Jolicode = '\n        ' + chalk.yellow('##') + '       ##            ##  ##   #######                   ##                ' + chalk.yellow('##') + '  ' + chalk.yellow('##') + '  \n      ' + chalk.yellow('##') + '         ##            ##      ##     ##                  ##               ' + chalk.yellow('##') + '    ' + chalk.yellow('##') + '  \n     ' + chalk.yellow('##') + '          ##   ######   ##  ##  ##          ######    #######   ######     ' + chalk.yellow('##') + '      ' + chalk.yellow('##') + '  \n     ' + chalk.yellow('##') + '          ##  ##    ##  ##  ##  ##         ##    ##  ##    ##  ########   ' + chalk.yellow('##') + '       ' + chalk.yellow('##') + '  \n      ' + chalk.yellow('##') + '  ##    ###  ##    ##  ##  ##  ##     ##  ##    ##  ##    ##  ##        ' + chalk.yellow('##') + '       ' + chalk.yellow('##') + '  \n       ' + chalk.yellow('##') + '   #####     ######   ##  ##   #######    ######    #######   ######  ' + chalk.yellow('##') + '       ' + chalk.yellow('##');
    var JolicodeDesc = '\n\n   A Yeoman generator for the Symfony2 framework\n\n   Created by ' + chalk.yellow('@JoliCode ') + ' & ' + chalk.blue('@lbrunet_com') + '\n   ' + chalk.cyan('http://jolicode.com/') + '\n';
    this.log(Jolicode);
    this.log(JolicodeDesc);
    this.bowerStandard = null; // remove
  },

  askSymfonyStandard: function () {
    var done = this.async();

    this.SymfonyStandardDistribution = {
      username: 'symfony',
      repository: 'symfony-standard',
      commit: '2.6'
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
        default: '2.6',
        choices: ['2.3', '2.5', '2.6']
      }];

      this.prompt(prompts, function (answers) {

        var repo = 'https://github.com/' + 'symfony' + '/' + 'symfony-standard' + '/tree/' + answers.symfonyCommit;
        console.log('Thanks! I\'ll use ' + repo);
        console.log('');

        this.symfonyDistribution = {
          username: 'symfony',
          repository: 'symfony-standard',
          commit: answers.symfonyCommit
        };

        done();
      }.bind(this));
    }
  },

  askToolsExtension: function () {
    var done = this.async();
    var prompts = [{
        type: 'list',
        name: 'toolsExtension',
        message: 'Which tools would you like to use ?',
        default: 'gulp',
        choices: ['grunt', 'gulp']
    }];
    this.prompt(prompts, function (answers) {
      this.toolsExtension = answers.toolsExtension;
      done();
    }.bind(this));
  },

  symfonyBase: function () {
      var done = this.async();
      var appPath = this.destinationRoot();

      this.remote(
        this.symfonyDistribution.username,
        this.symfonyDistribution.repository,
        this.symfonyDistribution.commit,
        function (err, remote) {
          if (err) {
            return done(err);
          }
          remote.directory('.', path.join(appPath, '.'));
          done();
        });
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      // this.fs.copy(
      //   this.templatePath('_bower.json'),
      //   this.destinationPath('bower.json')
      // );
      this.template('_bower.json', 'bower.json');
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

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
