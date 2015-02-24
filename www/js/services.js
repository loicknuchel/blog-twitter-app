angular.module('app')

.factory('TwittSrv', function($q){
  'use strict';
  var service = {
    getTwitts: getTwitts
  };

  function getTwitts(){
    return $q.when([
      {user: {id: 'IonicFramework', name: 'ionic', avatar: 'https://pbs.twimg.com/profile_images/459365829348302849/lJ1X8rU9_bigger.png'}, content: 'We interviewed @gnomeontherun, author of the upcoming book @IonicinAction. Check it out: http://ionicframework.com/blog/ionic-in-action-book/', url: 'https://twitter.com/Ionicframework/status/569962126556708864'},
      {user: {id: 'IonicBE', name: 'Ionic Belgium', avatar: 'https://pbs.twimg.com/profile_images/554941644579954688/xxp8o3Cq_bigger.png'}, content: 'Venez prendre un verre et discuter de votre project @Ionicframework au Monk bar @ Bxl ce vendredi à 20h!', url: 'https://twitter.com/IonicBE/status/569787372650385408'},
      {user: {id: 'forum_hc', name: 'Human Coders Forum', avatar: 'https://pbs.twimg.com/profile_images/539837685481762816/cOO1F28S_bigger.png'}, content: 'Avez-vous testé Ionic Framework? https://forum.humancoders.com/t/avez-vous-teste-ionic-framework/1341/2', url: 'https://twitter.com/forum_hc/status/568806047051165696'},
      {user: {id: 'loicknuchel', name: 'loic knuchel', avatar: 'https://pbs.twimg.com/profile_images/3133057797/81ea4e63c7078eec0a7c7d6ae57a3ce1_bigger.jpeg'}, content: 'Slides de mon #BBL sur @Ionicframework : http://loic.knuchel.org/blog/2015/02/19/talk-introduction-a-ionic-bbl-19-02-2015/ #hybrid #mobile #app', url: 'https://twitter.com/loicknuchel/status/568449174926176256'},
      {user: {id: 'raymondcamden', name: 'Raymond Camden', avatar: 'https://pbs.twimg.com/profile_images/378800000568876933/2da22327d055cbf8e0502c3f22888fef_bigger.jpeg'}, content: 'Good list of @Ionicframework resources: https://github.com/Alexintosh/Awesome-Ionic', url: 'https://twitter.com/raymondcamden/status/568424487693082625'},
      {user: {id: 'nraboy', name: 'Nic Raboy', avatar: 'https://pbs.twimg.com/profile_images/2653730816/5da4d8fb72352c715bbaffe07e56270e_bigger.jpeg'}, content: 'Use the native device calendar in your Android and iOS @IonicFramework mobile app using #ngCordova. https://blog.nraboy.com/2015/02/using-native-device-calendar-ionic-framework/ #appdev RT', url: 'https://twitter.com/nraboy/status/568438200198258689'},
      {user: {id: 'devgirlFL', name: 'Holly Schinsky', avatar: 'https://pbs.twimg.com/profile_images/378800000664886768/5aa49c1cded0317a887cae28f5d80cd7_bigger.jpeg'}, content: 'What to expect in @Ionicframework 1.0: https://medium.com/@saniyusuf/looking-forward-to-ionic-v1-0-ionic-io-tools-6cb8e76e29c3 via @saniyusuf', url: 'https://twitter.com/devgirlFL/status/563673910424928256'},
      {user: {id: 'maxlynch', name: 'Max Lynch', avatar: 'https://pbs.twimg.com/profile_images/546942133496995840/k7JAxvgq_bigger.jpeg'}, content: 'Awesome new Ionic course from @GoThinkster "Mastering Ionic - Learn to Build & Deploy Native Speed HTML5 Based Apps” https://thinkster.io/ionic-framework-tutorial/', url: 'https://twitter.com/maxlynch/status/568097163131006976'},
      {user: {id: 'asdvaughan', name: 'Andrew Vaughan', avatar: 'https://pbs.twimg.com/profile_images/519532575031713792/Fm4zj2Zm_bigger.jpeg'}, content: 'Ionic Framework Demo - Matt Stauffer: https://www.youtube.com/watch?v=nh9EARpk-dc via @YouTube Great framework setup demo and api consumption!', url: 'https://twitter.com/asdvaughan/status/566103487281635328'}
    ]);
  }

  return service;
});
