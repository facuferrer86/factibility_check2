sap.ui.define([
    "sap/ui/core/IconColor",
    "com/solarc/supplierportalfe/utils/types",
    "sap/ui/core/ValueState"
], function (IconColor, types, ValueState) {
    "use strict";
    return {

		/**
		 * Formats status color
		 * @param {string} sStatus - Strategy Status
		 * @returns {string} sColor - Semantic Color
		 */
        formatStatusColor: function (sStatus) {
            switch (sStatus) {
                case "C":
                    return ValueState.Information;
                case "P":
                case "PA":
                case "RP":
                case "VP":
                case "XP":
                    return ValueState.Warning;
                case "E":
                case "S":
                case "SR":
                case "SV":
                case "SS":
                case "ST":
                case "SX":
                    return ValueState.Success;
                case "F":
                case "FE":
                case "FR":
                case "FV":
                case "FT":
                case "FX":
                case "FS":
                    return ValueState.Error;
                default:
                    return ValueState.None;
            }
        },

        /**
		 * Formats status color
		 * @param {string} sStatus - Strategy Status
		 * @returns {string} sText - Semantic Color
		 */
        formatStatusText: function (sStatus) {
            switch (sStatus) {
                case "C":
                case "PA":
                case "P":
                case "PR":
                    return ValueState.Information;
                case "S":
                case "SR":
                case "SV":
                case "SS":
                case "ST":
                case "SX":
                    return ValueState.Success;
                case "E":
                case "F":
                case "FE":
                case "FR":
                case "FV":
                case "FT":
                case "FX":
                case "FS":
                    return ValueState.Error;
                default:
                    return "";
            }
        },

        /**
		 * Formats status color
		 * @param {string} sStatus - Strategy Status
		 * @returns {string} sColor - Semantic Color
		 */
        formatStatusIcon: function (sStatus) {
            switch (sStatus) {
                case "C":
                    return "sap-icon://message-information";
                case "PA":
                case "RP":
                case "VP":
                case "XP":
                    return "sap-icon://alert";
                case "P":
                    return "sap-icon://goalseek";
                case "E":
                case "S":
                case "SR":
                case "SV":
                case "SS":
                case "ST":
                case "SX":
                    return "sap-icon://message-success";
                case "F":
                case "FE":
                case "FR":
                case "FV":
                case "FT":
                case "FX":
                case "FS":
                    return "sap-icon://error";
                default:
                    return "";


            }
        },

		/** 
		 * Capitalizes a string
		 * @param {string} sString - String to be capitalized
		 * @returns {string} sCapitalized - Capitalized string
		 */
        capitalize: function (sString) {
            if (typeof sString !== 'string') return '';
            return sString.charAt(0).toUpperCase() + sString.slice(1);
        },

        severityToColor: function (sSeverity) {
            return {
                "HIGH": IconColor.Negative,
                "MEDIUM": IconColor.Critical,
                "LOW": IconColor.Positive
            }[sSeverity] || IconColor.Neutral;
        },

        trimTo: function (sText, iLength) {
            return sText.length > iLength ? (sText.substring(0, iLength) + "...") : sText;
        },

        formatToStr: function (iValue) {
            try {
                iValue.toString();
            } catch (err) {
                iValue = "err";
            }
            return iValue.toString();
        },
        getExtractText: function (sStatus) {
            switch (sStatus) {
                case "S":
                    return "Success";
                case "F":
                    return "Failed";
                default:
                    return "";
            }
        },
        getActiveStatus: function (sStatus) {
            switch (sStatus) {
                case "S":
                    return true;
                case "F":
                    return false;
                default:
                    return false;
            }
        },
        getExtractColor: function (sStatus) {
            switch (sStatus) {
                case "S":
                    return ValueState.Success;
                case "F":
                    return ValueState.Error;
                default:
                    return ValueState.None;
            }

        },

        getValidationText: function (sStatus) {
            switch (sStatus) {
                case "S":
                    return "Success";
                case "F":
                    return "Failed";
                default:
                    return "";
            }
        },
        getValidationColor: function (sStatus) {
            switch (sStatus) {
                case "S":
                    return ValueState.Success;
                case "F":
                    return ValueState.Error;
                default:
                    return ValueState.None;
            }

        },
        getXmlReconText: function (sError) {
            switch (sError) {
                case false:
                    return "Success";
                case true:
                    return "Failed";
                default:
                    return "Failed";
            }
        },
        getXmlReconColor: function (sError) {
            switch (sError) {
                case false:
                    return ValueState.Success;
                case true:
                    return ValueState.Error;
                default:
                    return ValueState.Error;
            }

        },

        mapErrorTypes: function (sErrorType) {
            switch (sErrorType) {
                case "S":
                    return ValueState.Success;
                case "E":
                    return ValueState.Error;
                case "I":
                    return ValueState.Information;
                case "W":
                    return ValueState.Warning;
                default:
                    return ValueState.None;
            }
        },

        mapMarkupDescription: function(sErrorCode){
            switch (sErrorCode) {
                case "369":
                    return true;
                default:
                    return false;
            }
        },

        mapSegments: function (sSegmentType) {
            var oExtract = this.getView().getBindingContext().getObject({
                expand: "to_DataPreparation"
            });
            if (oExtract) {
                var oSelectedSegment = oExtract.to_DataPreparation.find((oSegment) => {
                    return oSegment.SegmentId === sSegmentType;
                });
                if (oSelectedSegment) {
                    return oSelectedSegment.SegmentName;
                } else {
                    return "";
                }
            }
        },
        getReextractEnabled: function (sExtractionStatus, sReconciliationStatus, sValidationStatus) {
            return sExtractionStatus === "F" ? true :
                sReconciliationStatus === "F" ? true :
                    sValidationStatus === "F" ? true : false;

        }
    };
});