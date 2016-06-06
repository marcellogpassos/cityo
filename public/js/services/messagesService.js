app.factory("MessagesService", function (Messages, Util) {

    var _getMessage = function (type, id, args) {
        var messagesScope = null;

        switch (type) {
            case 'error':
                messagesScope = Messages.error;
                break;
            case 'information':
                messagesScope = Messages.information;
                break;
            case 'success':
                messagesScope = Messages.success;
                break;
            case 'warning':
                messagesScope = Messages.warning;
                break;
            default:
                return null;
        }

        if (!args)
            return messagesScope[id];

        else
            return Util.format(messagesScope[id], args);
    };

    return {
        getMessage: _getMessage
    };

});