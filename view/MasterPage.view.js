sap.ui.jsview(
        "myseventhapp.view.MasterPage", {
            getControllerName: function() {
                return "myseventhapp.controller.MasterPage";
            },

            createContent: function(oController) {
                // here we will create are UI via JS coding

                var oTableHeader = new sap.m.Toolbar ( {
                    content : [
                        new sap.m.Title( {
                            text : "No of Suppliers:   {/CountSuppliers}"            
                        })
                    ]
                });
        
                var oTable = new sap.m.Table("table", {
                    columns : [
                        new sap.m.Column({
                            header : new sap.m.Label({text : "Company Name"})
                        }),
                        new sap.m.Column({
                            header : new sap.m.Label({text : "Contact Name"})
                        }),
                        new sap.m.Column({
                            header : new sap.m.Label({text : "Contact Title"})
                        }),
                        new sap.m.Column({
                            header : new sap.m.Label({text : "Address/City"})
                        })
                    ],
                    headerToolbar : oTableHeader
                });
                oTable.bindItems("/Suppliers", new sap.m.ColumnListItem({
                    type: "Navigation",
                    press: [oController.onListPress, oController],
                    cells : [
                        new sap.m.Text({
                            text : "{CompanyName}"
                        }),
                        new sap.m.Text({
                            text : "{ContactName}"
                        }),
                        new sap.m.Text({
                            text : "{ContactTitle}"
                        }),
                        new sap.m.Text({
                            text : "{Address/City}"
                        })
                    ]
                }));
        
                var oPageMaster = new sap.m.Page({
                    title : "Suppliers",
                    content : [oTable]
                }); 

                return oPageMaster;
            }
        }
);

