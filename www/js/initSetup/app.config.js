(function() {
    'use strict';

    angular
        .module('starter')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    /* @ngInject */
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })
            .state('app.placas', {
                url: '/placas',
                views: {
                    'menuContent': {
                        templateUrl: 'js/placas/placas.html',
                        controller: 'Placas as vm'
                    }
                }
            })

        .state('app.fotos', {
            url: '/fotos/:idinspeccion',
            views: {
                'menuContent': {
                    templateUrl: 'js/fotos/foto.html',
                    controller: 'FotosCtrl as vm'
                }
            }
        })
           .state('app.calificacion', {
            url: '/calificacion/:idinspeccion/:idsubproceso',
            views: {
                'menuContent': {
                    templateUrl: 'js/calificacion/calificacion.html',
                    controller: 'CalificacionCtrl as vm'
                }
            }
        })

        .state('app.search', {
            url: '/search',
            views: {
                'menuContent': {
                    templateUrl: 'templates/search.html'
                }
            }
        })

        .state('app.browse', {
                url: '/browse',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/browse.html'
                    }
                }
            })
            .state('app.playlists', {
                url: '/playlists',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/playlists.html',
                        controller: 'PlaylistsCtrl'
                    }
                }
            })

        .state('app.single', {
            url: '/playlists/:playlistId',
            views: {
                'menuContent': {
                    templateUrl: 'templates/playlist.html',
                    controller: 'PlaylistCtrl'
                }
            }
        });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/placas');
    }
})();
