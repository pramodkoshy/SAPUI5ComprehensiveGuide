sap.ui.define([
    "./BaseController",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    
], function (BaseController, MessageToast, JSONModel) {
    "use strict";

    return BaseController.extend("myseventhapp.Controller.XMLEditPage", {
        onSave: function () {
            var sLocalPath,
            sUrl = "",
            oRouter = this.getRouter(),
            sPath = this.getView().getElementBinding().getPath(),
            oModel = this.getView().getModel(),
            oObject = oModel.getProperty(sPath);
            

            // check if we are in edit or create mode
            if (!this.getView().getModel("viewModel").getProperty("/createMode")) {
                sUrl = sUrl + "/Suppliers/" + oObject.id;
                sLocalPath = sPath;
            } else {
                alert ("create mode");
                sUrl = "/Suppliers";
            }
            oModel.saveEntry(oObject, sUrl, sLocalPath);
            oModel.attachEventOnce("requestCompleted", function (oEvent) {
                alert("requestCompleted");
                oRouter.navTo("masterPage");
                this.getView().getModel("viewModel").setProperty("/createMode", false);
            }, this);

            oModel.attachEventOnce("requestFailed", function (oEvent) {
                MessageToast.show("Update Failed");
            });
            
        },
        onInit : function () {
            var oTarget, oViewModel;
            this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
           
            oTarget = this._oRouter.getTarget("editPage");
            oViewModel = new JSONModel({
                "createMode": false,
            });
            this.getView().setModel(oViewModel, "viewModel");
            alert ("onInit");
            alert(oViewModel);
            this._oRouter.attachRoutePatternMatched(this._onRouteMatched, this);
        },
        onNavPress : function () {
            this.myNavBack("masterPage");
        },
        _onRouteMatched : function (oEvent) {
            var oEventData = oEvent.getParameter("arguments");
            
            if ((oEvent.getParameter("name") == "masterPage")) {
                return;
            }
            if (oEventData && oEventData.ID) {
                this.sObjectPath = "/" + oEventData.ID;
                alert("this.sObjectPath: " + this.sObjectPath);
            } else {
                alert("no ID");
                this.getView().getModel("viewModel").setProperty("/createMode", true);
                this.getView().getModel().createEntry("/");
                this.sObjectPath = "/createEntry";
            }
                
            
            alert(this.sObjectPath);
            this._bindView();
        },
        _bindView : function () {
            var oView = this.getView();

            oView.bindElement(this.sObjectPath);
        }

    });

})
