// declare a module
var ngModuleCards = angular.module('com.app.shuffle', []);
// angular.module('com.tc.onedc.xconnect', [])
ngModuleCards
.controller('CardsCtrl', function($scope) {
  // $scope.url = "http://xconnect.nextdc.loc/dc/json/devport/a/9";
  // $scope.noOfPorts = 12;

  $scope.cards = Array.apply(null, {length: 52}).map(Number.call, Number);
  $scope.scores = [];
  $scope.playerCards = [];
  // http://stackoverflow.com/questions/3746725/create-a-javascript-array-containing-1-n

  $scope.shuffle = function(array) {
    // http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    var currentIndex = array.length
      , temporaryValue
      , randomIndex
      ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };
  $scope.shuffleAndPlay = function() {
    $scope.noOfPlayers = parseInt($scope.noOfPlayers);
    if (($scope.noOfPlayers > 1) && ($scope.noOfPlayers < 18)) {
      $scope.cards = $scope.shuffle($scope.cards);
      console.log("Shuffled cards");
      console.log($scope.cards);
      $scope.playerCards = [];
      for (var iPlayer = 0; iPlayer < $scope.noOfPlayers; iPlayer++) {
        $scope.playerCards[iPlayer] = [];
        for (var iTurn = 0; iTurn < 3; iTurn++) {
          $scope.playerCards[iPlayer][iTurn] = $scope.cards[iPlayer + iTurn*$scope.noOfPlayers];
        };
      };
      console.log("Cards dealt");
      console.log($scope.playerCards);
      $scope.assignScores($scope.playerCards);
      console.log("Scores");
      console.log($scope.scores);
    }
  };
  $scope.assignScores = function(playersWithCards) {
    for (var iPlayer = 0; iPlayer < playersWithCards.length; iPlayer++) {
      $scope.scores[iPlayer] = $scope.calculateHand(playersWithCards[iPlayer]);
    }
  };
  $scope.calculateHand = function(cards) {
    var score = 0;
    for (var iCard = 0; iCard < cards.length; iCard++) {
      score += $scope.calculateCard(cards[iCard]);
    }
    return score;
  };
  $scope.calculateCard = function(card) {
    score = 0;
    // assiming cards orde is 2,3,4,5,6,7,8,9,10,J,Q,K,A x 4
    if ((card % 13 >= 0) && (card % 13 <= 7)) {
      score = card % 13 + 2;
      console.log(card % 13 + 2);
    }
    else {
      console.log("picture");
      score = 10;
    }
    return score;
  };
});


