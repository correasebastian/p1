(function() {
    'use strict';

    angular
        .module('app.placas')
        .factory('placasService', placasService);

    placasService.$inject = ['$q'];

    /* @ngInject */
    function placasService($q) {
        var service = {
            getPlacas: getPlacas
        };
        return service;

        ////////////////

        function getPlacas() {
            var arrayPlacas = [{
                idinspeccion: 1,
                placa: 'abc111'
            }];
            return $q.when(arrayPlacas);
        }
    }
})();
