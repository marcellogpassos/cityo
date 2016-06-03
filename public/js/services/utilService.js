app.factory("Util", function () {

    var _format = function (str, args) {
        return str.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };

    return {
        format: _format
    };

});