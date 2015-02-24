angular.module('app', ['ionic'])

.config(function($stateProvider, $urlRouterProvider){
  'use strict';
  $stateProvider
  .state('app', {
    url: '/app',
    templateUrl: 'views/app.html',
    controller: 'AppCtrl'
  });
  $urlRouterProvider.otherwise('/app');
})

.run(function($ionicPlatform) {
  'use strict';
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
