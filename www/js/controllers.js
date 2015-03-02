angular.module('app')

.controller('TabsCtrl', function($scope, UserSrv){
  'use strict';
  UserSrv.getUser().then(function(user){
    $scope.user = user;
  });
})

.controller('TwittsCtrl', function($scope, $ionicModal, $ionicPopover, Timeline){
  'use strict';
  $scope.twitts = Timeline.twitts;
  Timeline.init();

  $scope.doRefresh = function(){
    Timeline.refresh().finally(function(){
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.loadMore = function(){
    Timeline.loadMore().finally(function(){
      // Stop the ion-infinite-scroll from spinning
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };

  $ionicPopover.fromTemplateUrl('views/partials/menu-popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });

  var newTwittModal = null;
  $ionicModal.fromTemplateUrl('views/partials/new-twitt-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    newTwittModal = modal;
  });
  $scope.writeTwitt = function(){
    newTwittModal.show();
  };
  $scope.cancelWriteTwitt = function(){
    newTwittModal.hide();
  };
  $scope.sendTwitt = function(twitt){
    newTwittModal.hide();
    Timeline.send(twitt).then(function(){
      twitt.content = '';
    });
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function(){
    newTwittModal.remove();
  });
})

.controller('TwittCtrl', function($scope, $stateParams, Timeline){
  'use strict';
  var id = $stateParams.id;
  Timeline.get(id).then(function(twitt){
    $scope.twitt = twitt;
  });
})

.controller('NotificationsCtrl', function($scope){
  'use strict';

})

.controller('ProfilCtrl', function($scope){
  'use strict';

});
