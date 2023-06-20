    sap.ui.define([
        "com/solarc/supplierportalfe/controller/BaseController",
        "com/solarc/supplierportalfe/utils/types",
        "com/solarc/supplierportalfe/model/formatter",
        "sap/ui/model/Sorter",
        "sap/m/MessageToast",
        "sap/m/MessageBox"
    ],
        /**
         * @param {typeof sap.ui.core.mvc.Controller} BaseController
         */
        function (BaseController, types, formatter, Sorter, MessageToast, MessageBox) {
            "use strict";
    
            return BaseController.extend("com.solarc.supplierportalfe.controller.Main", jQuery.extend({
    
                types: types,
                formatter: formatter,
    
                onInit: function () {
                    this.getRouter().getRoute("RouteMain").attachMatched(this._onExtractionListMatched, this);
    
                },
    
                /**
                * Handler for the Extraction List route matched
                */
                _onExtractionListMatched: function () {
                    if(this.getModel().hasPendingChanges(true)){
                        this.getModel().resetChanges();
                    }
                    if (this.getView().byId("extractsTable").getBinding("items")) {
                        this.getView().byId("extractsTable").getBinding("items").refresh();
                    }
                },
    
                onExtractionPress: function (oEvent) {
                    var oItem = oEvent.getSource();
                    var oExtraction = oItem.getBindingContext().getObject();
    
                    this.navToDirect("RouteExtractionWizard", {
                        guid: oExtraction.Id
                    });
                },
    
                onExtractionCreate: function () {
                    this.openNewExtraction();
                },
    
                onBeforeRebindTable: function (oEvent) {
                    var mBindingParams = oEvent.getParameter("bindingParams");
                    //mBindingParams.sorter.push(new Sorter("CreatedAt", true));
                    //mBindingParams.parameters["expand"] = "to_Attachments,to_DataPreparation,to_XmlReconciliation";
                },
    
                onDownloadForm: function (oEvent) {
                    //var oExtraction = oEvent.getSource().getBindingContext().getObject();
                    //var sURL = oExtraction.FormUrl;
                    //var sURL = sap.ui.require.toUrl("com/solarc/supplierportalfe/images/Model_SAFT.pdf");
                    //window.open(sURL, "_blank");
                },
                onShowRecon1: function (oEvent) {
                    var oContext = oEvent.getSource().getBindingContext();
                    this.openReconPreview(oContext);
                },
                onShowRecon2: function (oEvent) {
                    var oContext = oEvent.getSource().getBindingContext();
                    this.openReconPreview2(oContext);
                },
    
                downloadEnabledFormatter: function (aAttachmentIds) {
                    if (aAttachmentIds) {
                        var aAttachments = aAttachmentIds.map((sIds) => {
                            return this.getModel().getProperty("/" + sIds);
                        }).filter((oAttachment) => {
                            return oAttachment.MediaType.includes("pdf");
                        });
                        return aAttachments.length > 0;
                    } else {
                        return false;
                    }
    
    
    
                },
                reconciliateEnabledFormatter: function (aDataPreparationIds) {
                    if (aDataPreparationIds) {
                        var aDataPreparations = aDataPreparationIds.map((sIds) => {
                            return this.getModel().getProperty("/" + sIds);
                        });
    
                        return aDataPreparations.length > 0;
                    } else {
                        return false;
                    }
                },
                validateEnabledFormatter: function (aReconciliationIds) {
                    if (aReconciliationIds) {
                        var aReconciliations = aReconciliationIds.map((sIds) => {
                            return this.getModel().getProperty("/" + sIds);
                        });
    
                        return aReconciliations.length > 0;
                    } else {
                        return false;
                    }
                },
                onSelectExtraction: function () {
                    var oItem = this.byId("extractsTable").getSelectedItem(),
                        bDeleteEnabled = false;
                    if (oItem) {
                        var oExtraction = oItem.getBindingContext().getObject();
                        if (oExtraction) {
                            bDeleteEnabled = true;
                        }
                    }
                    this.getView().getModel("view").setProperty("/extractionList/bDeleteEnabled", bDeleteEnabled);
                },
                onDeleteExtraction: function () {
                    var oItem = this.byId("extractsTable").getSelectedItem(),
                        oExtraction = oItem.getBindingContext().getObject(),
                        sPath = this.getModel().getEntityObjectPath(oExtraction);
    
                    MessageBox.warning(this.i18n("extractionList.DeleteExtractionWarning"), {
                        actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                        emphasizedAction: MessageBox.Action.NO,
                        onClose: (sAction) => {
                            if (sAction === MessageBox.Action.YES) {
                                this.getView().setBusy(true);
                                this.getModel().remove(sPath).then(() => {
                                    if (this.getView().byId("extractsTable").getBinding("items")) {
                                        this.getView().byId("extractsTable").getBinding("items").refresh();
                                    }
                                    MessageToast.show(this.i18n("extractionList.DeleteExtractionConfirmation"));
                                }).finally(() => {
                                    this.onSelectExtraction();
                                    this.getView().setBusy(false);
                                    this.getView().getModel("view").setProperty("/extractionList/bEditMode", false);
                                    this.getView().getModel("view").setProperty("/extractionList/bDeleteEnabled", false);
                                }).catch((oError) => {
                                    this.showErrorMessage(oError);
                                });
                            }
                        }
                    });
    
                }
            }, {}));
        });
