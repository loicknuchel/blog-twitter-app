angular.module('app')

.controller('AppCtrl', function($scope, TwittSrv){
  'use strict';
  TwittSrv.getTwitts().then(function(twitts){
    $scope.twitts = twitts;
  });
});
