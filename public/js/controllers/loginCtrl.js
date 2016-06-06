app.controller('loginCtrl', function ($scope, $rootScope) {

    $scope.credenciais = {
        email: null,
        senha: null
    };

    $scope.login = function (credenciais) {
        alert($rootScope.messages('success', 1, [credenciais.email]));
        // TODO: implementar login(credenciais)
    };

    $scope.abrirModal = function (selector) {
        $(selector).openModal();
    };

    $scope.fecharModalResetarSenha = function (selector, email) {
        $(selector).closeModal();
        if (email)
            alert($rootScope.messages('information', 0, [email]));
        // TODO: implementar fecharModalResetarSenha(selector, email)
    };

});