(function() {
    'use strict';

    angular
        .module('app.fotos')
        .factory('Fotos', Fotos);

    Fotos.$inject = ['promise', 'exception', 'logger', 'moment'];

    /* @ngInject */
    function Fotos(promise, exception, logger, moment) {

        var arrayFotos = [];
        var service = {
            getFotos: getFotos
        };
        return service;

        ////////////////

        function getFotos(idinspeccion) {
            var msg = 'obteniendo fotos';
            var errMsg = 'error ' + msg;
            var obj = {
                "idfoto": 104736,
                "idinspeccion": 7471,
                "path": "http://190.145.39.138/Img/fotos/2015/octubre/26/NCY171/1445879028773.jpg",
                "sync": 1,
                "uuid": "testuuid",
                "deleted": 0,
                "fecha": "2015-10-26T12:09:15",
                "idtipo": 639,
                "placa": "PFT967",
                "idajustev": 1199364,
                "onUpload": 0,
                "rutaSrv": "2015\/octubre\/26\/PFT967\/1445879354974.jpg"
            }

            return promise.emulate(msg, obj, 200, false)
                .then(onFotosCompleted)
                .catch(exception.catcher(errMsg));

            function onFotosCompleted(res) {
                //que es mejor si manejar un array aca en el servicio y hacer un push y habilitar la cache? o devolver solo el valor y volver a llamar getpplacas??
                var obj = res;
                arrayFotos.push(obj);
                return arrayFotos;
            }
        }
    }
})();
