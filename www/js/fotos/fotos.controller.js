  (function() {
      'use strict';

      angular
          .module('app.fotos')
          .controller('FotosCtrl', FotosCtrl);

      FotosCtrl.$inject = ['$stateParams', 'Fotos', '$q','logger'];

      function FotosCtrl($stateParams, Fotos, $q, logger) {
          // console.log(zumeroService, 'zumero service on fotos')
          /*jshint validthis: true */
          var vm = this;
          vm.fotos = [];
          vm.idinspeccion = $stateParams.id;

          activate();

          ////////////////

          function activate() {
              var promises = [
                  getFotos(vm.idinspeccion)
              ];
              $q.all(promises).then(onActivated);

              function onActivated(res) {

                  logger.info('fotos activado', res);
              }


          }

          function getFotos(idinspeccion) {
              return Fotos.getFotos(idinspeccion).then(onGetFotos);

              function onGetFotos(fotos) {
                  vm.fotos = fotos;
                  return vm.fotos;
              }
          }

          //end controller
      }
  })();
