sap.ui.define ([
        'sap/ui/core/mvc/Controller',
        "sap/ui/model/Filter",
	    "sap/ui/model/FilterOperator",
        "sap/ui/model/FilterType",
], function (Controller, Filter, FilterOperator, FilterType) {
    "use strict";
    return Controller.extend("myseventhapp.controller.XMLMasterPage", {

        onInit : function () {
            
        },

        getSearchFilters: function(query) {
            return new Filter({
              filters: [
                new Filter("ID", FilterOperator.Contains, query),
                new Filter("CompanyName", FilterOperator.Contains, query),
              ],
              and: false,
            });
          }, 

        onFilterSuppliers : function(event) {
            this.byId("table").getBinding("items").filter(new Filter({
              filters: [
                this.getSearchFilters(event.getParameter("query")),
              ],
              and: true,
            }), FilterType.Application);
          },
            

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
