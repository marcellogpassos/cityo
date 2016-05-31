app.config(function ($stateProvider, $urlRouterProvider) {


    $stateProvider

        .state('home', {
            url: "/home",
            views: {
                "mainView": {
                    templateUrl: "view/default/home.html",
                    controller: "homeCtrl"
                }
            }
        })

        .state('login', {
            url: "/login",
            views: {
                "mainView": {
                    templateUrl: "view/login/login.html",
                    controller: "loginCtrl"
                }
            }
        })

        .state('usuarios_cadastrar', {
            url: "/usuarios/cadastrar",
            views: {
                "mainView": {
                    templateUrl: "view/usuarios/cadastrar.html",
                    controller: "usuariosCtrl"
                }
            }
        });

});