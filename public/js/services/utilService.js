app.factory("Util", function () {

    var _format = function (string, replacements) {
        return string.replace(/\{(\d+)\}/g, function () {
            return replacements[arguments[1]];
        });
    };

    return {
        format: _format
    };

});