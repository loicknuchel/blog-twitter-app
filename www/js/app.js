angular.module('app', ['ionic'])

.config(function($stateProvider, $urlRouterProvider){
  'use strict';
  $stateProvider
  .state('tabs', {
    url: '/tabs',
    abstract: true,
    templateUrl: 'views/tabs.html',
    controller: 'TabsCtrl'
  })
  .state('tabs.twitts', {
    url: '/twitts',
    views: {
      'twitts-tab': {
        templateUrl: 'views/twitts.html',
        controller: 'TwittsCtrl'
      }
    }
  })
  .state('tabs.notifications', {
    url: '/notifications',
    views: {
      'notifications-tab': {
        templateUrl: 'views/notifications.html',
        controller: 'NotificationsCtrl'
      }
    }
  })
  .state('tabs.profil', {
    url: '/profil',
    views: {
      'profil-tab': {
        templateUrl: 'views/profil.html',
        controller: 'ProfilCtrl'
      }
    }
  });
  $urlRouterProvider.otherwise('/tabs/twitts');
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
