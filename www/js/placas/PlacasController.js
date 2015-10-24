(function() {
    'use strict';

    angular
        .module('app.placas')
        .controller('Placas', Placas);

    Placas.$inject = ['$scope',
        // 'zumeroService',
        // '$ionicPlatform',
        'placasService' //,
        // '$ionicNavBarDelegate',
        // '$location',
        // '$ionicPopup',
        // '$ionicScrollDelegate',
        // 'focus',
        // '$state',
        // 'titleService',
        // '$ionicModal',
        // 'toastService',
        // 'firstInitService',
        // '$localStorage',
        // '$ionicLoading',
        // '$filter',
        // 'intermediateService',
        // '$timeout'
    ];

    /* @ngInject */
    function Placas($scope,
        // zumeroService,
        // $ionicPlatform,
        placasService //,
        // $ionicNavBarDelegate,
        // $location,
        // $ionicPopup,
        // $ionicScrollDelegate,
        // focus,
        // $state,
        // titleService,
        // $ionicModal,
        // toastService,
        // firstInitService,
        // $localStorage,
        // $ionicLoading,
        // $filter,
        // intermediateService,
        // $timeout
    ) {

        var vm = this;
        vm.title = 'Placas';
        vm.placas = [];

        activate();

        ////////////////

        function activate() {
            placasService.getPlacas().then(onGetPlacas);

            function onGetPlacas(placas) {
                vm.placas = placas;
            }

        }
    }
})();
