sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
    ], function (Controller) {
        "use strict";

        return Controller.extend("myseventhapp.controller.XMLView", {
            onPress: function () {
                alert("Hello World");
            }
        });
    }
); 