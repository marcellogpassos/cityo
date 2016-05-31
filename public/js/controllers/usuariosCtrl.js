app.controller('usuariosCtrl', function ($scope, Datepicker, Enderecos) {

    $scope.usuario = {
        login: {
            email: null,
            senha: null
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
        $scope.setNascimento(picker.get());
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

    $scope.$on('$viewContentLoaded', function () {
        $('select').material_select();
    });

});