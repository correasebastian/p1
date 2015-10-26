  (function() {
      'use strict';

      angular
          .module('app.fotos')
          .controller('FotosCtrl', FotosCtrl);

      FotosCtrl.$inject = ['$stateParams', 'Fotos', '$q', 'logger', '$scope', '$ionicModal', 'filterService'];

      function FotosCtrl($stateParams, Fotos, $q, logger, $scope, $ionicModal, filterService) {
          // console.log(zumeroService, 'zumero service on fotos')
          /*jshint validthis: true */
          var vm = this;
          vm.fotos = [];
          vm.modal = null;
          vm.fotosFalt = [];
          vm.names = [];
          vm.idinspeccion = $stateParams.id;
          vm.closeModal = closeModal;
          vm.openModal = openModal;
          vm.setIdTipoFoto = setIdTipoFoto;

          activate();

          ////////////////

          function activate() {
              var promises = [
                  getFotos(vm.idinspeccion),
                  setModal(),
                  getNames()
              ];
              $q.all(promises).then(onActivated);

              function onActivated(res) {

                  logger.info('fotos activado', res);
              }


          }

          function setModal() {
              return $ionicModal.fromTemplateUrl('js/fotos/fotoModal.html', {
                  scope: $scope,
                  animation: 'slide-in-up'
              }).then(completeModal);

              function completeModal(modal) {
                  vm.modal = modal;
                  return vm.modal;
              }
          }

          function getFotos(idinspeccion) {
              return Fotos.getFotos(idinspeccion).then(onGetFotos);

              function onGetFotos(fotos) {
                  vm.fotos = fotos;
                  return vm.fotos;
              }
          }


          function openModal() {
              vm.modal.show();
          }

          function closeModal() {
              vm.modal.hide();
          }

          function setIdTipoFoto(tipoFoto) {
              vm.idtipo = tipoFoto;
              closeModal();
              takePic();
          }

          function getNames() {

              return Fotos.getNames().then(getNamesComplete);

              function getNamesComplete(data) {
                  vm.names = data;
                  angular.copy(vm.names, vm.fotosFalt);
                  angular.forEach(vm.fotos, function(obj, key) {
                      removeFromfaltantes(obj);
                  });

                  return vm.names;
              }

          }

          function removeFromfaltantes(obj) {
              var filterObj = {
                  idTipoFoto: obj.idtipo
              };
              filterService.rmObjFromArray(vm.fotosFalt, filterObj);
          }

          function takePic() {
              fotoService.takePic()

              .then(copyFile)
              // .then(onCompleteCopyFile)
              // .then(insertFoto)
              // .then(onCompleteInsertFoto)

              function copyFile(mediaURI) {
                var foto={path: mediaURI };
                vm.fotos.push(foto);
                  // return copyService.copyFile(mediaURI)
                }
              }

              function onCompleteCopyFile(FileEntry) {
                  // logger.info('copiado local', FileEntry)          
                  return FileEntry
              }

              function insertFoto(FileEntry) {
                  angular.extend(FileEntry, {
                      idinspeccion: vm.idinspeccion,
                      placa: vm.placa,
                      path: FileEntry.nativeURL,
                      sync: 0,
                      idtipo: vm.idtipo,
                      rutaSrv: momentService.rutaSrv(FileEntry.nativeURL, vm.placa)

                  });

                  // return fotoService.insertFoto(vm.idinspeccion, vm.placa, FileEntry)
                  return fotoService.insertFoto(FileEntry)
              }

              function onCompleteInsertFoto(FileEntry) {
                  var foto = {
                      idinspeccion: FileEntry.idinspeccion,
                      placa: FileEntry.placa,
                      path: FileEntry.path,
                      idfoto: FileEntry.idfoto,
                      sync: FileEntry.sync,
                      idtipo: FileEntry.idtipo.idTipoFoto,
                      rutaSrv: FileEntry.rutaSrv
                  };
                  vm.fotos.push(foto);
                  removeFromfaltantes(foto);
                  return FileEntry;
              }

              function uploadFile(FileEntry) {

                  return transferService.upload(FileEntry);
              }

              function onCompleteUploadFile(FileEntry) {
                  // logger.info('subido ok', FileEntry);
                  return FileEntry;
              }

              function updateFoto(FileEntry) {
                  return fotoService.updateFoto(FileEntry)
              }

              function onCompleteUpdateFoto(FileEntry) {
                  // logger.info('update ok', FileEntry);
              }


          }





          //end controller
      }
  })();
