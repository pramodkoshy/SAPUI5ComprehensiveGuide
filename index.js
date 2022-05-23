sap.ui.define([

], function () {
	"use strict";

     // your coding will go here
     var oPageMasterView = sap.ui.view(
        "masterPage",
           {
             viewName: "myseventhapp.view.View",
             type: sap.ui.core.mvc.ViewType.JS
           } 
     );
 
     
     var oApp = new sap.m.App(); 

    //oApp.addPage(oPageMasterView);

     oApp.placeAt("content");


});