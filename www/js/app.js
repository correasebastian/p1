(function(window, angular) {

    // Ionic Starter App

    // angular.module is a global place for creating, registering and retrieving Angular modules
    // 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
    // the 2nd parameter is an array of 'requires'
    // 'starter.controllers' is found in controllers.js
    angular.module('starter', [
        'ionic', 'starter.controllers', 'angular-loading-bar',
        'ngCordova', 'LocalStorageModule',

        //common
        'blocks.exception', 'blocks.logger', 'blocks.moment', 'blocks.sqlite', 'blocks.promise', 'blocks.filter',
        //app modules
        'app.placas', 'app.fotos','app.calificacion'
    ]);


})(window, angular);
