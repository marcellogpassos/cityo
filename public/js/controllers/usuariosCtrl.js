app.controller('usuariosCtrl', function ($scope, Datepicker, Enderecos) {

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

    $scope.confirmacaoEmail = null;
    $scope.confirmacaoSenha = null;

    $scope.ufs = null;
    $scope.municipios = null;

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
        console.log("Não foi possível carregar a lista de UF's!");
    });

    $scope.setCep = function (cep) {

        if (!cep || cep.length != 8)
            return;

        Enderecos.consultarCep(cep, function (endereco) {

            if (endereco.erro)
                console.log("Não foi possível carregar o endereço! CEP fornecido: " + cep);

            else {
                $scope.setUf(Enderecos.getUfId(endereco.ibge));

                $scope.usuario.endereco.uf = Enderecos.getUfId(endereco.ibge);
                $scope.usuario.endereco.municipio = Enderecos.getMunicipioId(endereco.ibge);
                $scope.usuario.endereco.bairro = endereco.bairro;
                $scope.usuario.endereco.logradouro = endereco.logradouro;
                $scope.usuario.endereco.complemento = endereco.complemento;
            }

        }, function (error) {
            console.log("Não foi possível carregar o endereço! CEP fornecido: " + cep);
        });

    };

    var atualizarCampos = function() {
        $('#municipio_input').val($scope.usuario.endereco.municipio);
        $('#uf_input').val($scope.usuario.endereco.uf);
    };

    $scope.setUf = function (uf) {

        if (!uf)
            $scope.usuario.endereco.uf = $scope.usuario.endereco.municipio = $scope.municipios = null;

        else if (uf == $scope.usuario.endereco.uf)
            return;

        else {
            Enderecos.listarMunicipios(uf, function (municipios) {
                $scope.municipios = municipios;
                atualizarCampos();
            }, function (error) {
                console.log("Não foi possível carregar a lista de Municípios! UF fornecido: " + uf);
            });
        }

    };

    $scope.cadastrarUsuario = function (usuario) {
        // TODO: implementar
    };

    $scope.confirmacaoInvalida = function (campo, confirmacaoEmailCampo) {
        return (campo && confirmacaoEmailCampo && (campo != confirmacaoEmailCampo));
    };

    $scope.validarFormulario = function (form) {
        if (form.$error.required || !$scope.usuario.dadosBasicos.dataNascimento)
            return false;

        if ($scope.confirmacaoInvalida($scope.usuario.login.email, $scope.confirmacaoEmail) ||
            $scope.confirmacaoInvalida($scope.usuario.login.senha, $scope.confirmacaoSenha))
            return false;

        return true;
    };

    $scope.abrirModal = function (selector) {
        $(selector).openModal();
    };

    $scope.aceitarTermosFecharModal = function (selector) {
        $scope.usuario.login.aceitoTermos = true;
        $(selector).closeModal();
    };

});