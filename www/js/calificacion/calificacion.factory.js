(function() {
    'use strict';

    angular
        .module('app.calificacion')
        .factory('Calificacion', Calificacion);

    Calificacion.$inject = ['promise', 'exception','$filter'];

    /* @ngInject */
    function Calificacion(promise, exception, $filter) {
        var service = {
            getTipos: getTipos,
            getClases: getClases,
            getCarrocerias: getCarrocerias,
            getInfo: getInfo,
            getItems: getItems,
            setIdClaCa: setIdClaCa
        };
        return service;

        ////////////////

        function getTipos() {
            var array = [{
                "value": 829,
                "label": "liviano"
            }, {
                "value": 844,
                "label": "pesado"
            }];

            var msg = 'obteniendo tipos';
            var errMsg = 'error ' + msg;

            return promise.emulate(msg, array, 200, false)
                .then(getTiposComplete)
                .catch(exception.catcher(errMsg));

            function getTiposComplete(data) {
                // var array = Sqlite.rtnArray(data);
                return data;
            }

        }

        function getInfo(idinspeccion) {
            var obj = {
                "idinspeccion": 7531,
                "placa": "PFI780",
                "sync": 0,
                "servicio": "Asegurabilidad liviano -",
                "revEst": 829,
                "calificado": 0
            };

            var msg = 'obteniendo Info';
            var errMsg = 'error ' + msg;

            return promise.emulate(msg, obj, 200, false)
                .then(getInfoComplete)
                .catch(exception.catcher(errMsg));

            function getInfoComplete(data) {
                // var array = Sqlite.rtnArray(data);
                return data;
            }
        }

        function getClases(tipo) {

            var array = [{
                "value": 378,
                "label": "Automovil"
            }, {
                "value": 382,
                "label": "Camioneta"
            }, {
                "value": 383,
                "label": "Campero"
            }];

            var msg = 'obteniendo clases';
            var errMsg = 'error ' + msg;

            return promise.emulate(msg, array, 200, false)
                .then(getClasesComplete)
                .catch(exception.catcher(errMsg));

            function getClasesComplete(data) {
                // var array = Sqlite.rtnArray(data);
                return data;
            }

        }

        function getCarrocerias(clase) {
            var array = [{
                "value": 85,
                "label": "Coupe"
            }, {
                "value": 94,
                "label": "Hatchback"
            }, {
                "value": 105,
                "label": "Sedan"
            }, {
                "value": 107,
                "label": "Station Wagon"
            }, {
                "value": 733,
                "label": "Convertible"
            }];

            var msg = 'obteniendo carrocerias';
            var errMsg = 'error ' + msg;

            return promise.emulate(msg, array, 200, false)
                .then(getCarroceriasComplete)
                .catch(exception.catcher(errMsg));

            function getCarroceriasComplete(data) {
                // var array = Sqlite.rtnArray(data);
                return data;
            }
        }

        function setIdClaCa(idsubproceso, informacion) {
            console.log('setidclaca', informacion);
            if (idsubproceso == 844 /*pesado, mas adelante se podria usar un case*/ ) {

            } else {

            }
            var obj = {
                "idclasecarroceria": 1,
                "idclase": 378,
                "idcarroceria": 105,
                "idcodigocalificacion": 930
            };

            var msg = 'obteniendo clasecarroceria';
            var errMsg = 'error ' + msg;

            return promise.emulate(msg, obj, 200, false)
                .then(getClaCaComplete)
                .catch(exception.catcher(errMsg));

            function getClaCaComplete(data) {
                // var array = Sqlite.rtnArray(data);
                return getItems(data);
            }
        }

        function getItems(info) {
            var array = [{
                "idservicio": 829,
                "iditem": 240,
                "idParentItem": 239,
                "nombre": "Tipo de direccion",
                "customsection": 1036,
                "customorder": 530,
                "controlJson": [{
                    "value": "192",
                    "label": "Asistida"
                }, {
                    "value": "193",
                    "label": "Hidraulica "
                }, {
                    "value": "194",
                    "label": "Mecanica"
                }],
                "Orden": 20
            }];

            var msg = 'obteniendo items';
            var errMsg = 'error ' + msg;

            return promise.emulate(msg, array, 200, false)
                .then(getItemsComplete)
                .catch(exception.catcher(errMsg));

            function getItemsComplete(data) {
                // var array = Sqlite.rtnArray(data);
                var array=setJson(data);
                var sections=getSections(array);
                var secItems={
                    items:array,
                    sections:sections
                };
                return secItems;
            }
        }

        function setJson(array) {
            angular.forEach(array, function(value, key) {
                value.controlJson = angular.fromJson(value.controlJson);
                var sl = {
                    value: value.controlJson[0].value,
                    label: value.controlJson[0].label
                };
                // console.log('primer');
                value.sl = sl;
            });
            return array;
        }

        function getSections (array) {
            var sections= $filter('orderBy')(array, 'Orden');
            return sections;
        }

        //end factory
    }
})();
