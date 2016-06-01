app.controller('usuariosCtrl', function ($scope, Datepicker, Enderecos) {

    $scope.confirmacaoEmail = null;
    $scope.confirmacaoSenha = null;

    $scope.usuario = {
        login: {
            email: null,
            senha: null,
            aceitoTermos: null
        },
        dadosBasicos: {
            nome: null,
            sobrenome: null,
            cpf: null,
            dataNascimento: null,
            sexo: null,
            telefone: null
        },
        endereco: {
            cep: null,
            logradouro: null,
            numero: null,
            bairro: null,
            municipio: null,
            uf: null,
            complemento: null
        }
    };

    $scope.setNascimento = function (date) {
        $scope.usuario.dadosBasicos.dataNascimento = Datepicker.fromBrDateFormat(date);
    };

    var picker = Datepicker.getDatepicker('#nascimento_input', null, new Date(), function () {
        $scope.$apply($scope.setNascimento(picker.get()));
    });

    $scope.ufs = null;
    $scope.municipios = null;

    Enderecos.listarUfs(function (ufs) {
        $scope.ufs = ufs;
    }, function (error) {
        // TODO: implementar
    });

    $scope.setCep = function (cep) {
        Enderecos.consultarCep(cep, function (endereco) {
            // TODO: implementar
        }, function (error) {
            // TODO: implementar
        });
    };

    $scope.setUf = function (uf) {
        Enderecos.listarMunicipios(uf, function (municipios) {
            $scope.municipios = municipios;
        }, function (error) {
            // TODO: implementar
        });
    };

    $scope.cadastrarUsuario = function (usuario) {
        // TODO: implementar
    };

    $scope.confirmacaoInvalida = function (campo, confirmacaoEmailCampo) {
        return (campo && confirmacaoEmailCampo && (campo != confirmacaoEmailCampo));
    }

    $scope.validarFormulario = function (form) {
        if(form.$error.required || !$scope.usuario.dadosBasicos.dataNascimento)
            return false;

        if($scope.confirmacaoInvalida($scope.usuario.login.email, $scope.confirmacaoEmail) ||
            $scope.confirmacaoInvalida($scope.usuario.login.senha, $scope.confirmacaoSenha))
            return false;

        return true;
    }

    $scope.abrirModal = function (selector) {
        $(selector).openModal();
    }

    $scope.aceitarTermosFecharModal = function (selector) {
        $scope.usuario.login.aceitoTermos = true;
        $(selector).closeModal();
    }

});