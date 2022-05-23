sap.ui.jsview("myseventhapp.view.JSView", {

    getControllerName() {
        return "myseventhapp.controller.JSView";
    },

    createContent(oController) {
        var oButton = new sap.m.Button({
            text: "Press Me",
            press: oController.onPress
        });
     
        var oPanel = new sap.m.Panel({
            headerText: "Hello Panel",
            content: [oButton]
            
        });


        var oPage = new sap.m.Page({
            title: "Hello Page",
            content: [oPanel]
        });

        return oPage;

    }
}); 