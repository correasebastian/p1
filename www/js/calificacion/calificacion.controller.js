(function() {
    'use strict';

    angular
        .module('app.calificacion')
        .controller('CalificacionCtrl', CalificacionCtrl);

    CalificacionCtrl.$inject = [];

    /* @ngInject */
    function CalificacionCtrl() {
        var vm = this;
        vm.title = 'CalificacionCtrl';

        activate();

        ////////////////

        function activate() {
        }
    }
})();