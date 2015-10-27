(function() {
    'use strict';

    angular
        .module('app.calificacion')
        .controller('CalificacionCtrl', CalificacionCtrl);

    CalificacionCtrl.$inject = ['$q', 'logger', '$ionicModal', '$scope', 'Calificacion', '$stateParams'];

    /* @ngInject */
    function CalificacionCtrl($q, logger, $ionicModal, $scope, Calificacion, $stateParams) {
        var vm = this;
        vm.title = 'CalificacionCtrl';
        vm.carrocerias = [];
        vm.clases = [];
        vm.closeModalOne = closeModalOne;
        vm.hideCarrocerias = hideCarrocerias;
        vm.idinspeccion = parseInt($stateParams.idinspeccion);
        vm.idsubproceso = parseInt($stateParams.idsubproceso);
        vm.modal = null;
        vm.modalOne = null;
        vm.openModalOne = openModalOne;
        vm.hideItems = hideItems;
        vm.getCarrocerias = getCarrocerias;
        vm.getClases = getClases;
        vm.setIdClaCa = setIdClaCa;
        vm.showItems = showItems;
        vm.setup = null;
        vm.tipos = [];
        vm.validateSingle = validateSingle;

        activate();

        ////////////////

        function activate() {
            var promises = [
                getInfo(),
                setModalOne(),
                getTipos(),
                setModal()

            ];
            $q.all(promises).then(onActivated);

            function onActivated(res) {

                logger.info('calificacion activado', res);
            }
        }

        function getTipos() {
            return Calificacion.getTipos().then(onGetTiposCompleted);

            function onGetTiposCompleted(data) {
                vm.tipos = data;
                return vm.tipos;
            }
        }

        function getInfo() {
            return Calificacion.getInfo(vm.idinspeccion).then(onGetInfo);

            function onGetInfo(data) {
                vm.setup = data;
                return vm.setup;
            }
        }


        function closeModalOne() {
            vm.modalOne.hide();
            // inspeccionService.clearTipo();
            vm.cl.idclase = null;
            vm.cl.idcarroceria = null;
            vm.cl.tipo = null;
        }

        function setModalOne() {
            return $ionicModal.fromTemplateUrl('js/calificacion/modalGetItems.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                vm.modalOne = modal;
                return vm.modalOne;
            });
        }

        function openModalOne() {
            vm.modalOne.show();
        }

        function setModal() {
            return $ionicModal.fromTemplateUrl('js/calificacion/opcionModal.html', {
                scope: $scope
            }).then(onModalCompleted);

            function onModalCompleted(modal) {
                vm.modal = modal;
                return vm.modal;
            }
        }

        function getClases(tipo) {
            Calificacion.getClases(tipo).then(onGetclasesComplete);

            function onGetclasesComplete(data) {
                vm.clases = data;

            }
        }


        function getCarrocerias(tipo) {
            Calificacion.getCarrocerias(tipo).then(ongetCarroceriasComplete);

            function ongetCarroceriasComplete(data) {
                vm.carrocerias = data;

            }
        }

        function hideCarrocerias() {
            // logger.warning('h carro')
            if (vm.carrocerias.length < 1 || vm.cl.idclase === null || (vm.cl.tipo == 844 && vm.cl.conjuntoPanel === null)) {
                // logger.warning(true)
                return true;
            } else {
                return false;
            }
        }

        function setIdClaCa() {
            Calificacion.setIdClaCa(vm.idsubproceso, vm.cl)
                .then(onGetItemsCompleted);

            function onGetItemsCompleted(data) {
                vm.modalOne.hide();
                vm.sections = data.sections;
                vm.items = data.items;
                console.log('items', data);
            }
        }

        function showItems(item) {
            // if ($scope.alreadySaved) {
            //     return;
            // }
            // item.dirty = true;
            // inspeccionService.item = item;
            vm.item = item;
            vm.modal.show();
        }

        function hideItems() {
            vm.modal.hide();
        }

        function validateSingle(opcion) {

            // Set selected text
            vm.item.sl.label = opcion.label;
            // Set selected value
            vm.item.sl.value = opcion.value;

            // Hide items
            vm.hideItems(); // Execute callback function
        }


    }
})();
