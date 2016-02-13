/* global angular*/


var app = angular.module('app', []);

app.controller('pomodoro', ['$scope', '$interval', pomodoro]);

function pomodoro($scope, $interval) {

  var clipSpeed;

  $scope.timer;
  $scope.sessionLength = 25;
  $scope.breakLength = 7;
  $scope.startCountdown = startCountdown;
  $scope.changeTimerLength = changeTimerLength;

  initializeSession();
  
  function changeTimerLength(dir, round){
    if(dir === 'up' && round === 'session'){
      $scope.sessionLength += 1;
    }  else if(dir === 'up' && round === 'break'){
      $scope.breakLength += 1;
    } else if(dir === 'down' && round === 'session' && $scope.sessionLength > 0){
      $scope.sessionLength -= 1;
    }  else if(dir === 'down' && round === 'break' && $scope.breakLength > 0){
      $scope.breakLength -= 1;
    } 
  }
  
  function runCountdown() {
    if ($scope.totalSeconds > 0) {
      $scope.totalSeconds -= 1;
      $scope.seconds = $scope.totalSeconds % 60;
      $scope.minutes = Math.floor($scope.totalSeconds / 60);

      if ($scope.seconds === 0) {
        $scope.clipPathCircle = 200;
        $scope.clipPathRectangle += clipSpeed;
      } else {
        $scope.clipPathCircle += 2.5 / 3;
      }
    } else if ($scope.round === 'Session') {
      initializeBreak();
    } else if ($scope.round === 'Break') {
      initializeSession();
    }
  }

  function startCountdown (startTime) {
    if (angular.isDefined($scope.timer)) {
      stopCountdown();
    } else {
      initializeSession();
      $scope.timer = $interval(runCountdown, 1000);
    }

  }

  function stopCountdown() {
    if (angular.isDefined($scope.timer)) {
      $interval.cancel($scope.timer);
      $scope.timer = undefined;
    }
  }

  function initializeSession() {
    $scope.totalSeconds = $scope.sessionLength * 60;
    $scope.seconds = '00';
    $scope.minutes = Math.floor($scope.totalSeconds / 60);
    $scope.round = 'Session';
    $scope.color = 'grey';
    clipSpeed = 160 / $scope.minutes;
    $scope.clipPathRectangle = 30;
    $scope.clipPathCircle = 200;
  }

  function initializeBreak() {
    $scope.totalSeconds = $scope.breakLength * 60;
    $scope.seconds = '00';
    $scope.minutes = Math.floor($scope.totalSeconds / 60);
    $scope.round = 'Break';
    $scope.color = 'tomato';
    clipSpeed = 160 / $scope.minutes;
    $scope.clipPathRectangle = 30;
    $scope.clipPathCircle = 200;
  }

}
