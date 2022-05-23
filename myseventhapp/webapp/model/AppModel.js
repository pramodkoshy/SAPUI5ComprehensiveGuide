sap.ui.define([
    "sap/ui/model/json/JSONModel",
], function(JSONModel) {
    "use strict";

    return JSONModel.extend("myseventhapp.model.AppModel", {

        createEntry : function () {
            this.setProperty("/createEntry",
            {
                "SupplierID": "",
                "CompanyName": "",
                "ContactName": "",
                "ContactTitle": "",
            
            });
        },

        saveEntry : function (oObject, sUrl, sLocalPath) {

            var sType,
                that =  this,
                oData;
            
            alert ("sLocalPath: " + sLocalPath);    
            
            if (sLocalPath) {
                sType = "PUT";
            } else {
                sType = "POST";
            }

            oData = JSON.stringify(oObject);
            alert("sType: " + sType);
            alert("oData: " + oData);
            alert("sUrl: " + sUrl);

            jQuery.ajax({
                
                type: sType,
                contentType: "application/json",
                data: oData,
                url : sUrl,
                success: function() {
                    alert("success");
                    that._updateModel(sLocalPath, oObject);
                    that.createEntry("/");
                    that.fireRequestCompleted();
                },
                error: function() {
                    that.fireRequestFailed();
                }
            });

        },

        deleteEntry : function (sUrl, sLocalPath) {
            var that = this;
            alert("deleteEntry");
            alert ("sUrl: " + sUrl);
            alert ("sLocalPath: " + sLocalPath);
            jQuery.ajax({
                type: "DELETE",
                contentType : "application/json",
                url : sUrl,
                success: function() {
                    that._updateModel(sLocalPath, null, true);
                    that.fireRequestCompleted();
                },
                error: function() {
                    that.fireRequestFailed();
                }
            });
        },

        
        _updateModel : function (sLocalPath, data, bDelete) {
            alert("_updateModel" + sLocalPath);
            
            var aData = this.getData();

            alert("aData: " + JSON.stringify(aData));

            if (sLocalPath && bDelete) {
                alert("delete");
                aData.splice(sLocalPath.substr(1), 1);
                this.setData(aData);
                this.refresh();
            }
            else if (sLocalPath) {
                this.setProperty(sLocalPath, data);
            } else {
                aData.push(data);
                this.setData(aData);
            }
        },
        
    });
});
    