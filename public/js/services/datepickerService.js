app.factory("Datepicker", function () {

    var _getDatepicker = function (selector, min, max, onCloseFunction) {
        var $inputData = $(selector).pickadate({
            format: 'dd/mm/yyyy',
            formatSubmit: 'dd/mm/yyyy',
            min: (min ? min : undefined),
            max: (max ? max : undefined),
            onClose: (onCloseFunction ? onCloseFunction : undefined),
            selectMonths: true,
            selectYears: 120,
            monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            weekdaysFull: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
            showMonthsShort: true,
            today: 'Hoje',
            clear: 'Limpar',
            close: 'Fechar',
            labelMonthNext: 'Próximo mês',
            labelMonthPrev: 'Mês anterior',
            labelMonthSelect: 'Selecione um mês',
            labelYearSelect: 'Selecione um ano'
        });

        return $inputData.pickadate('picker');
    };

    var _fromBrDateFormat = function (brFormat) {
        var date = brFormat.split('/').reverse();
        date[1]--;
        return new Date(date.join('-'));
    };

    var _toBrDateFormat = function (inputFormat) {
        function pad(s) {
            return (s < 10) ? '0' + s : s;
        }

        var d = new Date(inputFormat);
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
    };

    return {
        getDatepicker: _getDatepicker,
        fromBrDateFormat: _fromBrDateFormat,
        toBrDateFormat: _toBrDateFormat
    };

});