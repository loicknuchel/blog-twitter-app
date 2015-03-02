angular.module('app')

.factory('Timeline', function($q, TwittSrv){
  'use strict';
  var service = {
    twitts: [],
    init: function(){
      return TwittSrv.getTwitts().then(function(twitts){
        while(service.twitts.length > 0) { service.twitts.pop(); }
        for(var i in twitts){
          service.twitts.push(twitts[i]);
        }
      });
    },
    refresh: function(){
      return TwittSrv.getNewTwitts().then(function(twitts){
        for(var i=twitts.length-1; i>=0; i--){
          service.twitts.unshift(twitts[i]);
        }
      });
    },
    loadMore: function(){
      return TwittSrv.getMoreTwitts().then(function(twitts){
        for(var i in twitts){
          service.twitts.push(twitts[i]);
        }
      });
    },
    get: function(id){
      for(var i in service.twitts){
        if(service.twitts[i].id === id){
          return $q.when(angular.copy(service.twitts[i]));
        }
      }
      return $q.when();
    },
    send: function(twitt){
      return TwittSrv.sendTwitt(twitt).then(function(newTwitt){
        service.twitts.unshift(newTwitt);
      });
    }
  };

  return service;
})

.factory('UserSrv', function($q){
  'use strict';
  var service = {
    getUser: function(){
      return $q.when({id: 'loicknuchel', name: 'Loïc Knuchel', avatar: 'https://pbs.twimg.com/profile_images/3133057797/81ea4e63c7078eec0a7c7d6ae57a3ce1_bigger.jpeg'});
    }
  };

  return service;
})

.factory('TwittSrv', function($q, $timeout, UserSrv){
  'use strict';
  var twitts = [
    {user: {id: 'IonicFramework', name: 'ionic', avatar: 'https://pbs.twimg.com/profile_images/459365829348302849/lJ1X8rU9_bigger.png'}, content: 'We interviewed @gnomeontherun, author of the upcoming book @IonicinAction. Check it out: http://ionicframework.com/blog/ionic-in-action-book/', meta: {time: 1424724521000, rt: 28, fav: 38}, url: 'https://twitter.com/Ionicframework/status/569962126556708864'},
    {user: {id: 'IonicBE', name: 'Ionic Belgium', avatar: 'https://pbs.twimg.com/profile_images/554941644579954688/xxp8o3Cq_bigger.png'}, content: 'Venez prendre un verre et discuter de votre project @Ionicframework au Monk bar @ Bxl ce vendredi à 20h!', meta: {time: 1424682876000, rt: 1, fav: 2}, url: 'https://twitter.com/IonicBE/status/569787372650385408'},
    {user: {id: 'forum_hc', name: 'Human Coders Forum', avatar: 'https://pbs.twimg.com/profile_images/539837685481762816/cOO1F28S_bigger.png'}, content: 'Avez-vous testé Ionic Framework? https://forum.humancoders.com/t/avez-vous-teste-ionic-framework/1341/2', meta: {time: 1424448941000, rt: 0, fav: 2}, url: 'https://twitter.com/forum_hc/status/568806047051165696'},
    {user: {id: 'loicknuchel', name: 'Loïc Knuchel', avatar: 'https://pbs.twimg.com/profile_images/3133057797/81ea4e63c7078eec0a7c7d6ae57a3ce1_bigger.jpeg'}, content: 'Slides de mon #BBL sur @Ionicframework : http://loic.knuchel.org/blog/2015/02/19/talk-introduction-a-ionic-bbl-19-02-2015/ #hybrid #mobile #app', meta: {time: 1424363796000, rt: 10, fav: 13}, url: 'https://twitter.com/loicknuchel/status/568449174926176256'},
    {user: {id: 'nraboy', name: 'Nic Raboy', avatar: 'https://pbs.twimg.com/profile_images/2653730816/5da4d8fb72352c715bbaffe07e56270e_bigger.jpeg'}, content: 'Use the native device calendar in your Android and iOS @IonicFramework mobile app using #ngCordova. https://blog.nraboy.com/2015/02/using-native-device-calendar-ionic-framework/ #appdev RT', meta: {time: 1424361216000, rt: 10, fav: 23}, url: 'https://twitter.com/nraboy/status/568438200198258689'},
    {user: {id: 'raymondcamden', name: 'Raymond Camden', avatar: 'https://pbs.twimg.com/profile_images/378800000568876933/2da22327d055cbf8e0502c3f22888fef_bigger.jpeg'}, content: 'Good list of @Ionicframework resources: https://github.com/Alexintosh/Awesome-Ionic', meta: {time: 1424357916000, rt: 2, fav: 6}, url: 'https://twitter.com/raymondcamden/status/568424487693082625'},
    {user: {id: 'devgirlFL', name: 'Holly Schinsky', avatar: 'https://pbs.twimg.com/profile_images/378800000664886768/5aa49c1cded0317a887cae28f5d80cd7_bigger.jpeg'}, content: 'What to expect in @Ionicframework 1.0: https://medium.com/@saniyusuf/looking-forward-to-ionic-v1-0-ionic-io-tools-6cb8e76e29c3 via @saniyusuf', meta: {time: 1423225296000, rt: 10, fav: 11}, url: 'https://twitter.com/devgirlFL/status/563673910424928256'},
    {user: {id: 'maxlynch', name: 'Max Lynch', avatar: 'https://pbs.twimg.com/profile_images/546942133496995840/k7JAxvgq_bigger.jpeg'}, content: 'Awesome new Ionic course from @GoThinkster "Mastering Ionic - Learn to Build & Deploy Native Speed HTML5 Based Apps” https://thinkster.io/ionic-framework-tutorial/', meta: {time: 1424279916000, rt: 10, fav: 12}, url: 'https://twitter.com/maxlynch/status/568097163131006976'},
    {user: {id: 'asdvaughan', name: 'Andrew Vaughan', avatar: 'https://pbs.twimg.com/profile_images/519532575031713792/Fm4zj2Zm_bigger.jpeg'}, content: 'Ionic Framework Demo - Matt Stauffer: https://www.youtube.com/watch?v=nh9EARpk-dc via @YouTube Great framework setup demo and api consumption!', meta: {time: 1423804596000, rt: 0, fav: 2}, url: 'https://twitter.com/asdvaughan/status/566103487281635328'}
  ];

  var service = {
    getTwitts: getTwitts,
    getNewTwitts: getNewTwitts,
    getMoreTwitts: getMoreTwitts,
    sendTwitt: sendTwitt
  };

  function getTwitts(){
    var t = angular.copy(twitts);
    for(var i in t){
      t[i].id =  generateId();
    }
    return $q.when(t);
  }

  function getNewTwitts(){
    var defer = $q.defer();
    $timeout(function(){
      var newTwitt = angular.copy(twitts[Math.floor(Math.random()*twitts.length)]);
      newTwitt.id =  generateId();
      defer.resolve([newTwitt]);
    }, 1000);
    return defer.promise;
  }

  function getMoreTwitts(){
    var defer = $q.defer();
    $timeout(function(){
      var newTwitts = [];
      for(var i=0; i<5; i++){
        var twitt = angular.copy(twitts[Math.floor(Math.random()*twitts.length)]);
        twitt.id = generateId();
        newTwitts.push(twitt);
      }
      defer.resolve(newTwitts);
    }, 1000);
    return defer.promise;
  }

  function sendTwitt(twitt){
    var defer = $q.defer();
    $timeout(function(){
      var newTwitt = angular.copy(twitt);
      UserSrv.getUser().then(function(user){
        newTwitt.id = generateId();
        newTwitt.user = user;
        newTwitt.meta = {time: Date.now(), rt: 0, fav: 0};
        defer.resolve(newTwitt);
      });
    }, 1000);
    return defer.promise;
  }

  function generateId(){
    var id = '';
    for(var i=0; i<18; i++){
      id += Math.floor(Math.random()*10);
    }
    return id;
  }

  return service;
});
