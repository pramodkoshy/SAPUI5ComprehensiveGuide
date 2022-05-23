sap.ui.define ([
        'sap/ui/core/mvc/Controller',
], function (Controller) {
    "use strict";
    return Controller.extend("myseventhapp.controller.XMLMasterPage", {

        onAddSupplier: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("editPage");
        },
      
        onListPress: function (oEvent) {
           
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var oItem = oEvent.getSource();
            
            var item =  oEvent.getSource().getBindingContext().sPath;

            alert(item);

            var index = item.split('/')[1];

            alert(index);
           
            oRouter.navTo("detailPage", {
                ID: index
            }); 

        } 
        
    });
}); 