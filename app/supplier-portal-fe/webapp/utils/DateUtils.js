sap.ui.define([
    "sap/ui/core/date/UniversalDateUtils", "sap/ui/core/date/UniversalDate"

], function (UniversalDateUtils, UniversalDate) {
    "use strict";

    return {
        getRange: function(oStartDate){
            var oDateFrom = new UniversalDate(0),
                oDateTo   = new UniversalDate(0);
            oDateFrom.setDate(oStartDate.getDate());
            oDateFrom.setMonth(oStartDate.getMonth());
            oDateFrom.setFullYear(oStartDate.getFullYear());
            oDateFrom = UniversalDateUtils.getMonthStartDate(oDateFrom);
            var oDateRange = UniversalDateUtils.getRange(0, "MONTH", oDateFrom);

            oDateFrom = oDateRange[0].oDate;
            oDateTo = oDateRange[1].oDate;

            oDateTo.setHours(0);
            oDateTo.setMinutes(0);
            oDateTo.setSeconds(0);

            oDateFrom = this.convertLocalDateToUTCIgnoringTimezone(oDateFrom);
            oDateTo = this.convertLocalDateToUTCIgnoringTimezone(oDateTo);

            return [oDateFrom, oDateTo];
        },

        convertLocalDateToUTCIgnoringTimezone: function (date) {
            const timestamp = Date.UTC(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                date.getHours(),
                date.getMinutes(),
                date.getSeconds(),
                date.getMilliseconds(),
            );

            return new Date(timestamp);
        },

        convertUTCToLocalDateIgnoringTimezone: function (utcDate) {
            return new Date(
                utcDate.getUTCFullYear(),
                utcDate.getUTCMonth(),
                utcDate.getUTCDate(),
                utcDate.getUTCHours(),
                utcDate.getUTCMinutes(),
                utcDate.getUTCSeconds(),
                utcDate.getUTCMilliseconds(),
            );
        },
        monthDiff: function (dateFrom, dateTo) {
            return dateTo.getUTCMonth() - dateFrom.getUTCMonth() + 1 +
                (12 * (dateTo.getUTCFullYear() - dateFrom.getUTCFullYear()))
        }
    }
});