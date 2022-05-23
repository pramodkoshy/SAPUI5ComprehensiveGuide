sap.ui.jsview("myseventhapp.view.XMLDetailPage", {
    
    getControllerName: function() {
        return "myseventhapp.controller.XMLDetailPage";
    },

    createContent: function(oController) {
        // here we will create are UI via JS coding
        var oObjectHeader = new sap.m.ObjectHeader({
            title: "{CompanyName}",
            number: "ID: {SupplierID}",
            attributes: [
                new sap.m.ObjectAttribute({
                    text: "{Address/Country}"
                }),
            ]
        });

        var oPageDetail = new sap.m.Page({
            title: "Supplier Detail",
            content: [oObjectHeader],
            showNavButton: true,
            navButtonPress: [oController.onNavButtonPress, oController]
        });
        return oPageDetail;
    }
});
