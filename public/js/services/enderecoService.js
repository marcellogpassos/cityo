app.factory("Enderecos", function () {

    var _consultarCep = function (cep, successFunction, errorFunction) {

    };

    var _listarUfs = function (successFunction, errorFunction) {

    };

    var _listarMunicipios = function (uf, successFunction, errorFunction) {

    };

    return {
        consultarCep: _consultarCep,
        listarUfs: _listarUfs,
        listarMunicipios: _listarMunicipios
    };

});