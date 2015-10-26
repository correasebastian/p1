(function() {
    'use strict';

    angular
        .module('app.placas')
        .factory('placasService', placasService);

    placasService.$inject = ['$q', 'exception', 'momentService', 'promise'];

    /* @ngInject */
    function placasService($q, exception, momentService, promise) {
        var i = 1;
        var arrayPlacas = [{
            idinspeccion: i,
            placa: 'abc111'
        }];
        var arrayServicios = [{
            "label": 'pesados',
            value: 1
        }];
        var service = {
            getPlacas: getPlacas,
            getServicios: getServicios,
            addPlaca: addPlaca
        };
        return service;

        ////////////////

        function getPlacas() {

            // return $q.when(arrayPlacas);

            return reject(false)
                .then(onGetPlacas)
                .catch(exception.catcher('no se obtuvieron las placas del servidor'));

            function onGetPlacas(placas) {
                return placas;
            }
        }

        function addPlaca(placa, srv) {
            var obj = {
                placa: placa,
                idinspeccion: i++,
                srv: srv,
                unix: momentService.getUnixSeconds()
            };

            return promise.emulate('ingresando placa', obj, 200, false)
                .then(onAddCompleted)
                .catch(exception.catcher('no se ingreso la placa'));

            function onAddCompleted(res) {

                //que es mejor si manejar un array aca en el servicio y hacer un push y habilitar la cache? o devolver solo el valor y volver a llamar getpplacas??
                var obj = res;
                arrayPlacas.push(obj);
                return arrayPlacas;
            }
            // return $q.when(arrayPlacas);
        }

        function reject(bool) {
            if (bool) {
                return $q.reject('hvjahbckajbciuabckijd');
            }
            return $q.when(arrayPlacas);

        }

        function getServicios() {
            return $q.when(arrayServicios);
        }
    }
})();
