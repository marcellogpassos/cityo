app.controller('loginCtrl', function ($scope, Util, Messages) {

    $scope.credenciais = {
        email: null,
        senha: null
    };

    $scope.login = function (credenciais) {
        alert(Util.format(Messages.success[1], [credenciais.email]));
        // TODO: implementar login(credenciais)
    };

    $scope.abrirModal = function (selector) {
        $(selector).openModal();
    };

    $scope.fecharModalResetarSenha = function (selector, email) {
        $(selector).closeModal();
        if (email)
            alert(Util.format(Messages.information[0], [email]));
        // TODO: implementar fecharModalResetarSenha(selector, email)
    };

});