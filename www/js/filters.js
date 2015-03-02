angular.module('app')

.filter('datetime', function(){
  'use strict';
  return function(timestamp){
    if(timestamp){
      var date = new Date(timestamp);
      return date.getHours()+':'+date.getMinutes()+' '+date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    } else {
      return '';
    }
  };
});
