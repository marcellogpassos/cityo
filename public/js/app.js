var app = angular.module('cityo', [
    'ngResource',
    'ui.router',
    'ui.utils.masks'
]);

app.run(['$rootScope', 'MessagesService', function ($rootScope, MessagesService) {

    $rootScope.safeApply = function (fn) {
        var phase = this.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && (typeof(fn) === 'function'))
                fn();
        }
        else
            this.$apply(fn);
    };

    $rootScope.messages = MessagesService.getMessage;

}]);