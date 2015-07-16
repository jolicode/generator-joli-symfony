var App = App || {};

App.module = function () {

  //Private
  var addition = function(a, b) {
    return console.log(a + b);
  };

  //Public
  var homepage = function() {
    var numberOne = 4;
    var numberTwo = 4;

    addition(numberOne, numberTwo);
  };

  return {
    homepage: homepage
  };

}();