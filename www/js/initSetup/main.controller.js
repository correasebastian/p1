(function() {
    'use strict';

    angular
        .module('starter')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = [];

    /* @ngInject */
    function MainCtrl() {
        var vm = this;
        vm.title = 'MainCtrl';
        vm.setOfflineMode=setOfflineMode;
        vm.offlineMode=false;
        vm.hide=false;

        activate();

        ////////////////

        function activate() {
        }

        function setOfflineMode (bool) {
        	console.log('setofflinemode', bool);
            vm.offlineMode=bool;
        }
    }
})();