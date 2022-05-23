sap.ui.define(
        [   
            "myseventhapp/Controller/BaseController",
            "sap/ui/core/routing/History",
            "sap/m/MessageToast"
        ], function (BaseController, History,  MessageToast) {
        "use strict";
        return BaseController.extend("myseventhapp.controller.XMLDetailPage", {
                
                onInit : function() {
                    alert("Detail Page");
                    this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    this._oRouter.getRoute("detailPage").attachPatternMatched(this._onRouteMatched, this);
                    var oModel = new sap.ui.model.json.JSONModel({
                        buttonPrev: false,
                        buttonNext: false,
                    });
                    this.getView().setModel(oModel, "ViewModel");
                },
                _updateViewModel : function() {

                    // find out if there is a next onject in line
                    var oModel = this.getView().getModel();
                    var oViewModel = this.getView().getModel("ViewModel");
                    var nextObjectId = parseInt(this.sObjectID) + 1;
                    var prevObjectId = parseInt(this.sObjectID) - 1;

                    // check if these is a next object in line or previous by adding +1 or -1
                    var bNext = !!oModel.getProperty("/" + nextObjectId);
                    var bPrev = !!oModel.getProperty("/" + prevObjectId);
                    oViewModel.setProperty("/buttonNext", bNext);
                    oViewModel.setProperty("/buttonPrev", bPrev);
                },
                onEdit : function() {
                    var sObjectPath = this.getView().getElementBinding().getPath().substr(1);
                    alert(sObjectPath);
                    this._oRouter.navTo("editPage", {
                        ID: sObjectPath
                    }, false);
                },
                onDelete : function() {
                    alert("delete");
                    var oModel = this.getView().getModel();
                    var sLocalPath = this.getView().getElementBinding().getPath();
                    var sObject = oModel.getProperty(sLocalPath);
                    var that = this;


                    alert("SObject" + JSON.stringify(sObject.id));
                    alert("sLocalPath" + sLocalPath);
                    oModel.deleteEntry("/Suppliers/" + sObject.id, sLocalPath);
                    
                    oModel.attachEventOnce("requestCompleted", function (oEvent) {
                        that._oRouter.navTo("masterPage");
                    }, this);

                    oModel.attachEventOnce("requestFailed", function (oEvent) {
                        MessageToast.show("Delete Failed");
                    });
                },
                onPageUp : function (oEvent) {
                    var sID = oEvent.getSource().getBindingContext().sPath;
                    sID = parseInt(sID.substring(sID.lastIndexOf("/") + 1));
                    sID -= 1
                    this._oRouter.navTo("detailPage", {ID: sID});  
                },
                onPageDown : function (oEvent) {
                    var sID = oEvent.getSource().getBindingContext().sPath;
                    sID = parseInt(sID.substring(sID.lastIndexOf("/") + 1));
                    sID += 1
                    this._oRouter.navTo("detailPage", {ID: sID}); 
                },
                _onRouteMatched: function (oEvent) {
                    alert("Detail Matched");
                    var sObjectPath = "/" + oEvent.getParameter("arguments").ID;
                    var oView = this.getView();
                    oView.bindElement({
                        path: sObjectPath
                    });
                    this._createProductsAggregation(sObjectPath);
                    this._updateViewModel();
                },
                onNavButtonPress: function() {
                    var oHistory = History.getInstance();
                    var sPreviousHash = oHistory.getPreviousHash();
                    alert("Previous Hash" + sPreviousHash);
                    if (sPreviousHash !== undefined) {
                        window.history.go(-1);
                    } else {
                        this._oRouter.navTo("masterPage", {}, true);
                    }
                },
                _bindView: function (sObjectPath) {
                    var oView = this.getView();
                    oView.bindElement({
                        path: sObjectPath
                    });
                },
                toUpperCase: function (sText) {
                    if (!sText) {
                        return "";
                      }
                    return sText.toUpperCase();
                },
                _createProductsAggregation: function(sObjectPath) {
                    var oTable = this.getView().byId("table");
                    
                    oTable.bindAggregation("items", "Products", function (sId, oContext) {
                        var sAllergens = oContext.getProperty("Alergens");
                        var oColumnListItem = new sap.m.ColumnListItem(sId);

                        oColumnListItem.addCell(new sap.m.Text({
                            text: oContext.getProperty("ProductID")
                        }));

                        if (sAllergens) {
                            
                            oColumnListItem.addCell(
                                new sap.ui.layout.VerticalLayout({
                                    content: [
                                        new sap.m.Text({
                                            text: "{ProductName}",
                                        }
                                        ),
                                        new sap.m.Text({
                                            text: "{Alergens}",
                                        })
                                    ]
                                })
                            );
                        } else {
                            
                            oColumnListItem.addCell(new sap.m.Text({
                                text: oContext.getProperty("ProductName")
                            }));
                        };
                        oColumnListItem.addCell(new sap.m.Text({
                            text: oContext.getProperty("UnitPrice")
                        }));

                        return oColumnListItem;
            
                    });
                }
        }); 
    }); // end of controller 