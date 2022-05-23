sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "myseventhapp/model/AppModel",
    "sap/ui/Device"
], function (UIComponent, JSONModel, AppModel, Device) {
    "use strict";
    return UIComponent.extend("myseventhapp.Component", {
       
        metadata: {
            manifest: "json"
        },
     
        /**
         * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
         * @public
         * @override
         */
        init: function () {

        

            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);
            
            // create the device model
            var oModel = new JSONModel(Device);
            oModel.setDefaultBindingMode("OneWay");
            this.setModel(oModel, "device");
            var oAppModel = new AppModel();

            jQuery.ajax({
                contentType: "application/json",
                url: "/Suppliers",
                success : function (oData) {
                    
                    oAppModel.setData(oData);
                },
                error : function (oError) {
                    console.log(oError);
                }           
            });

            // create the views based on the url/hash
            this.getRouter().initialize();
            this.setModel(oAppModel);
    
        }

    
    });
});
