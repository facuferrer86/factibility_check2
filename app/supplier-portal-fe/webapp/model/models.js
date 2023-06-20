sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device",
    "com/solarc/supplierportalfe/utils/PromisifiedODataModel",
    'sap/m/DynamicDateUtil'
], function (JSONModel, Device, PromisifiedODataModel, DynamicDateUtil) {
    "use strict";

    return {

        createDeviceModel: function () {
            var oModel = new JSONModel(Device);
            oModel.setDefaultBindingMode("OneWay");
            return oModel;
        },

        createViewModel: function () {
            return new JSONModel({
                busyIndicatorDelay: 0,
                currentView: "extractionList",
                extractionList: {
                    searchValue: "",
                    headerExpanded: true,
                    sorter: {
                        sPath: "ConvLastChangedAt"
                    },
                    newExtraction: {
                        timeframeOptions: {
                            Quarterly: ["THISQUARTER",
                                "LASTQUARTER",
                                "NEXTQUARTER",
                                "QUARTER1",
                                "QUARTER2",
                                "QUARTER3",
                                "QUARTER4"]
                        },
                        timeframeValueState: "None",
                        timeframeValueStateText: ""
                    },
                    bDeleteEnabled: false,
                    bEditMode: false
                },
                extractionWizard: {
                    guid: "",
                    currentStep: "extractionStep",
                    steps: {},
                    bStepsHandlersSetted: false,
                    dialogs: {
                        messagePopover: {
                            bBackVisible: false,
                            sTitle: ""
                        }
                    }
                }
            });
        },

        createMainModel: function () {
            return new PromisifiedODataModel("/SupplierOrders/", {
                defaultBindingMode: "TwoWay",
                refreshAfterChange: false
            });

            /*
            For local usage
            annotationURI: [
                
                    jQuery.sap.getModulePath("tech.Solarc.saft.app.saft", "/localService/Solarc/UI_SF_EXT_02_VAN.xml"),
                    jQuery.sap.getModulePath("tech.Solarc.saft.app.saft", "/annotations/annotation.xml")
                ]
            */
        }

    };
});