angular.module('app')

.controller('AppCtrl', function($scope, TwittSrv){
  'use strict';
  TwittSrv.getTwitts().then(function(twitts){
    $scope.twitts = twitts;
  });

  $scope.doRefresh = function(){
    TwittSrv.getNewTwitts().then(function(newTwitts){
      $scope.twitts = newTwitts.concat($scope.twitts);
    }).finally(function() {
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.loadMore = function(){
    TwittSrv.getMoreTwitts().then(function(olderTwitts){
      $scope.twitts = $scope.twitts.concat(olderTwitts);
    }).finally(function() {
      // Stop the ion-infinite-scroll from spinning
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };
});
