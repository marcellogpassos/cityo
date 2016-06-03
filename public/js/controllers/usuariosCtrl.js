app.controller('usuariosCtrl', function ($scope, $rootScope, Datepicker, Enderecos, Util, Messages) {

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

    $scope.setCepBusy = false;
    $scope.setUfBusy = false;

    $scope.setNascimento = function (date) {
        $scope.usuario.dadosBasicos.dataNascimento = Datepicker.fromBrDateFormat(date);
    };

    var picker = Datepicker.getDatepicker('#nascimento_input', null, new Date(), function () {
        $rootScope.safeApply(function () {
            $scope.setNascimento(picker.get());
        });
    });

    $scope.ufs = null;
    $scope.municipios = null;

    Enderecos.listarUfs(function (ufs) {
        $scope.ufs = ufs;
    }, function (error) {
        console.log(Messages.error[0]);
    });

    $scope.setCep = function (cep) {
        if (!cep || cep.length != 8)
            return;

        $scope.setCepBusy = true;

        Enderecos.consultarCep(cep, function (endereco) {
            if (endereco.erro)
                console.log(Util.format(Messages.error[1], [cep]));

            else {
                $scope.usuario.endereco.bairro = endereco.bairro;
                $scope.usuario.endereco.logradouro = endereco.logradouro;
                $scope.usuario.endereco.complemento = endereco.complemento;

                var ufId = Enderecos.getUfId(endereco.ibge);
                var municipioId = Enderecos.getMunicipioId(endereco.ibge);

                $scope.usuario.endereco.uf = ufId;
                $scope.usuario.endereco.municipio = municipioId;

                $scope.setUf(ufId);
            }

            $scope.setCepBusy = false;

        }, function (error) {
            console.log(Util.format(Messages.error[1], [cep]));

            $scope.setCepBusy = false;
        });
    };

    $scope.setUf = function (ufId) {
        if (!ufId)
            $scope.usuario.endereco.uf = $scope.usuario.endereco.municipio = $scope.municipios = null;

        else {
            $scope.setUfBusy = true;

            Enderecos.listarMunicipios(ufId, function (municipios) {

                if (municipios && !municipios.erro) {
                    $scope.municipios = municipios;
                } else {
                    var errorMessage =
                        municipios ? municipios.mensagem : Util.format(Messages.error[2], [ufId]);

                    console.log(errorMessage);
                }

                $scope.setUfBusy = false;
            }, function (error) {
                console.log(Util.format(Messages.error[2], [ufId]));

                $scope.setUfBusy = true;
            });
        }

    };

    $scope.cadastrarUsuario = function (usuario) {
        alert(Util.format(Messages.success[0], [usuario.dadosBasicos.nome]));
        // TODO: implementar cadastrarUsuario(usuario)
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