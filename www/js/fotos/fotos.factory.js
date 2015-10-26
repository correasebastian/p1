(function() {
    'use strict';

    angular
        .module('app.fotos')
        .factory('Fotos', Fotos);

    Fotos.$inject = ['promise', 'exception', 'logger', 'moment', '$cordovaCamera'];

    /* @ngInject */
    function Fotos(promise, exception, logger, moment, $cordovaCamera) {

        var arrayFotos = [];
        var service = {
            getFotos: getFotos,
            getNames: getNames,
            takePic: takePic
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
                "idtipo": 494,
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



        function getNames() {
            /* var query = store.get('consulta').cGetNameFotosByRol; //consultaService.consultas.cPlacas;
             var binding = [store.get('dataInit').idrolsura];
             return Sqlite.execute(query, binding)*/
            var msg = 'obteniendo names';
            var errMsg = 'error ' + msg;
            var array = [{
                "idTipoFoto": 494,
                "NombreFoto": "Placa",
                "orden": 1,
                "cantidad": 1
            }, {
                "idTipoFoto": 625,
                "NombreFoto": "Frente Licencia Transito",
                "orden": 10,
                "cantidad": 1
            }, {
                "idTipoFoto": 626,
                "NombreFoto": "Dorso Licencia Transito",
                "orden": 20,
                "cantidad": 1
            }];
            return promise.emulate(msg, array, 200, false)
                .then(getNamesComplete)
                .catch(exception.catcher(errMsg));

            function getNamesComplete(data) {
                // var array = Sqlite.rtnArray(data);
                return data;
            }

        }


        function takePic() {
            var msg = 'tomando foto';
            var errMsg = 'error ' + msg;
            var imageURI='img/sunset.jpg';
            /*     var options = {
                     quality: 40,
                     //50,
                     destinationType: Camera.DestinationType.FILE_URI,
                     sourceType: Camera.PictureSourceType.CAMERA,
                     // allowEdit: true,
                     encodingType: Camera.EncodingType.JPEG,
                     targetWidth: 1000,
                     //importante con 100 se veia horrible
                     targetHeight: 1000,
                     // si le pongo true me crea problemas
                     saveToPhotoAlbum: false
                 };*/
            /*  return $cordovaCamera.getPicture(options)
                  .then(onCompleteTakePic)
                  .catch(exception.catcher(errMsg));*/

            return promise.emulate(msg, imageURI, 200, false)
                .then(onCompleteTakePic)
                .catch(exception.catcher(errMsg));

            function onCompleteTakePic(imageURI) {
                logger.success(msg)
                return imageURI;
            }

        }


        ////end controller
    }
})();
