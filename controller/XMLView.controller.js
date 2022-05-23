sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
    ], function (Controller) {
        "use strict";

        return Controller.extend("myseventhapp.controller.JSView", {
            onPress: function () {
                alert("Hello World");
            }
        });
    }
); 