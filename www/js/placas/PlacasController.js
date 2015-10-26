(function() {
    'use strict';

    angular
        .module('app.placas')
        .controller('Placas', Placas);

    Placas.$inject = ['$scope',
        // 'zumeroService',
        // '$ionicPlatform',
        'placasService',
        '$ionicNavBarDelegate',
        // '$location',
        '$ionicPopup',
        // '$ionicScrollDelegate',
        // 'focus',
        '$state',
        // 'titleService',
        // '$ionicModal',
        // 'toastService',
        // 'firstInitService',
        // '$localStorage',
        // '$ionicLoading',
        '$q',
        'logger',
        '$filter' //,
        // 'intermediateService',
        // '$timeout'
    ];

    /* @ngInject */
    function Placas($scope,
        // zumeroService,
        // $ionicPlatform,
        placasService,
        $ionicNavBarDelegate,
        // $location,
        $ionicPopup,
        // $ionicScrollDelegate,
        // focus,
        $state,
        // titleService,
        // $ionicModal,
        // toastService,
        // firstInitService,
        // $localStorage,
        // $ionicLoading,
        $q,
        logger,
        $filter //,
        // intermediateService,
        // $timeout
    ) {

        var vm = this;
        vm.title = 'Placas';
        vm.placas = [];
        vm.placa = 'def456'; // null;
        vm.servicios = [];
        vm.sl = 1; // null;
        vm.filter = '';
        vm.hasFocus = false;
        vm.goFotos = goFotos;
        vm.refresh = refresh;
        vm.setFocus = setFocus;
        vm.setOpciones = setOpciones;
        vm.noFocus = noFocus;
        vm.placaPopup = placaPopup;

        activate();

        ////////////////

        function activate() {
            var promises = [
                getPlacas(),
                getServicios()
            ];
            $q.all(promises).then(onActivated);

            function onActivated(res) {

                logger.info('placas activado', res);
            }


        }

        function refresh() {
            getPlacas()
                .finally(completeRefresh);

            function completeRefresh() {
                // Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            }
        }

        function getPlacas() {
            return placasService.getPlacas()
                .then(onGetPlacas);

            function onGetPlacas(placas) {
                console.log('placas en el controller');
                vm.placas = placas;
                return vm.placas;
            }
        }

        function getServicios() {
            return placasService.getServicios()
                .then(onGetServicios);

            function onGetServicios(servicios) {
                vm.servicios = servicios;
                return vm.servicios;
            }

        }

        function noFocus() {
            vm.hasFocus = false;
            $ionicNavBarDelegate.title('');
            vm.filter = '';
        }

        function setFocus() {
            vm.hasFocus = true;
            $ionicNavBarDelegate.title('');
            focus.focus('searchPrimary'); //no es necesario abrir el keyboard se abre solo cuando asignamos el focus // cordova.plugins.Keyboard.show();
        }

        function placaPopup() {
            var myprompt = $ionicPopup.prompt({
                title: 'Nueva Placa',
                templateUrl: 'js/placas/insertPlaca.html',
                scope: $scope,
                buttons: [{
                    text: 'Cancel',
                    onTap: function(e) {
                        cleanData();
                    }
                }, {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if (vm.placa === null) {
                            //|| vm.sl === null
                            e.preventDefault();
                        } else {
                            return vm.placa;
                        }
                    }
                }]
            });
            myprompt.then(function(placa) {
                if (placa !== null && placa !== undefined) {
                    addPlaca(placa);
                }

            }); // TODO: organizar el focus en el input del popup
        }

        function cleanData() {
            console.log('cleandata');
            vm.placa = null;
            vm.sl = null;
        }

        function addPlaca(placa) {
            if (placa.length < 4) {
                logger.error('longitud de placa muy corta');
                // toastService.showShortBottom('longitud de placa muy corta');
                return;
            }
            placa = placa.replace(/[^\w\s]/gi, '').toUpperCase();
            placa = placa.replace(/\s/g, '');
            var found = $filter('filter')(vm.placas, {
                placa: placa
            }, true);
            if (found.length) {
                console.log('placa ya registrada');
                // toastService.showShortBottom('placa ya registrada');
                return;
            }
            placasService.addPlaca(placa, vm.sl).then(onAddPlaca);

            function onAddPlaca(placas) {
                vm.placas = placas;
                cleanData();

            }
        }

        function goFotos(placa) {
            $state.go('app.fotos', {
                idinspeccion: placa.idinspeccion
            });
        }

        function setOpciones(revEst) {
            // console.log(revEst);
            /* if (!revEst) {
               return false;
             }*/
            return true;
        }

        //fin del controlador
    }
})();
