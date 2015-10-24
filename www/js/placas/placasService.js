(function() {
    'use strict';

    angular
        .module('app.placas')
        .factory('placasService', placasService);

    placasService.$inject = ['$q','exception'];

    /* @ngInject */
    function placasService($q, exception) {
        var i = 1;
        var arrayPlacas = [{
            idinspeccion: i,
            placa: 'abc111'
        }];
        var service = {
            getPlacas: getPlacas,
            addPlaca: addPlaca
        };
        return service;

        ////////////////

        function getPlacas() {

            // return $q.when(arrayPlacas);

            return reject(true)
            .then(onGetPlacas)
            .catch(exception.catcher('no se obtuvieron las placas del servidor'));

            function onGetPlacas (placas) {
                return placas;
            }
        }

        function addPlaca(placa) {
            var obj = {
                placa: placa,
                idinspeccion: i++
            };
            arrayPlacas.push(obj);
            return $q.when(arrayPlacas);
        }

        function reject(bool) {
            if (bool) {
                return $q.reject('hvjahbckajbciuabckijd');
            }
            return $q.when(arrayPlacas);

        }
    }
})();
