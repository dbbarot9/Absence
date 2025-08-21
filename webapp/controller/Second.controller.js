sap.ui.define([
    "zleavedata/controller/BaseController",
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    'sap/ui/model/odata/v2/ODataModel',
    'sap/m/MessageToast',
    'sap/m/SearchField',
    'sap/m/Token',
    'sap/ui/comp/library',
    'sap/ui/model/type/String',
    'sap/m/ColumnListItem',
    'sap/m/Label',
    'sap/ui/table/Column',
    'sap/m/Column',
    "sap/ui/core/Fragment",
    'sap/m/Text',
    'sap/ui/export/Spreadsheet'
], (BaseController,Controller,Filter,FilterOperator,ODataModel, MessageToast, SearchField, Token, compLibrary, TypeString, ColumnListItem, Label,  UIColumn, MColumn, Fragment, Text, Spreadsheet) => {
    "use strict";

    return Controller.extend("BaseController", {
        onInit() {
         // debugger;
          this.oRouter = this.getOwnerComponent().getRouter();
          this.oRouter.getRoute("RouteTo").attachMatched(this.herculis, this);
       //   var columnVal = this.getView().byId("idColoumn");
       //   var oFilter3 = new Filter("pernr", FilterOperator.EQ, '40116');
        //  data1.push(oFilter3);
         
          //   var oBinding = this.getView().byId("table").getBinding("items","/DeliverySet");
       //   var oBinding = this.getView().byId("table").bindItems({
       //     path: "/TimeaccountSet",
       //     template: columnVal,
       //     filters: oFilter3
       //   });
        },
        herculis: function(oEvent){
          debugger;
        //  var oArgs = oEvent.getParameter("arguments");
          var sId = oEvent.getParameter("arguments").leave;
          var sPath = "/" + sId;
      //    var sName = oEvent.getParameter("arguments").ktext;
       //   this.getView().byId('idDetail').setTitle(sName);
          var data1 = [];
          var columnVal = this.getView().byId("idColoumn");
          var oFilter1 = new Filter("pernr", FilterOperator.EQ, sPath.substr(24,7));
          var oFilter2 = new Filter("ktart", FilterOperator.EQ, sPath.substr(40,2));
          data1.push(new Filter({
            path: "PERNR",
            value1: sPath.substr(24,7),
            operator: FilterOperator.EQ,
          }));
          data1.push(new Filter({
            path: "KTART",
            value1: sPath.substr(40,2),
            operator: FilterOperator.EQ,
          }));
        //  var oBinding = this.getView().byId("table").getBinding("items","/DeliverySet");
             var oBinding = this.getView().byId("table").bindItems({
               path: "/TimetakenSet",
               template: columnVal,
               filters: data1
             });
         // var pernr = sPath.substr(24,6);
        },
        
        onExport: function() {
          var aCols, oRowBinding, oSettings, oSheet,delNo, oTable;
          var oModel = this.getView().getModel();
          debugger;
          if (!this._oTable) {
            this._oTable = this.byId('Detail');
          }
    
          oTable = this._oTable;
          oRowBinding = oTable.getBinding('items');
          ///sap/opu/odata/SAP/ZINNOTRACK_SRV/DeliveryTextSet?$filter=VBELN eq '80001527'
        //oRowBinding = oModel.getBindings('items');
          aCols = this.createColumnConfig();
        //  exportLibrary.load();
       //   delNo = this.getView().byId('idVbeln').getValue();
          oSettings = {
            workbook: {
              columns: aCols,
              hierarchyLevel: 'Leval'
            },
            
            dataSource: {
              type: 'odata',
           //   dataUrl: '/sap/opu/odata/SAP/ZINNOTRACK_SRV/DeliveryTextSet?$filter=VBELN eq%2080001527%27%27&$format=%27xlsx%27',
              dataUrl: oRowBinding.getDownloadUrl ? oRowBinding.getDownloadUrl() : null,
           //   serviceUrl: this._sServiceUrl,
              headers: oModel.getHeaders ? oModel.getHeaders() : null,
              count: oRowBinding.getLength ? oRowBinding.getLength() : null,
              sizeLimit: 400000,
              useBatch: false // Default for ODataModel V2
            },
            fileName: 'Leaves_' + oTable.getItems()[0].getCells()[0].getBinding("text").getValue() + '_track',
            fileType: 'sap.ui.export.FileType.XSLX',
            showProgress: true
           // worker: true // We need to disable worker because we are using a MockServer as OData Service
          };
          debugger;
          oSheet = new Spreadsheet(oSettings);
        //oSheet = new sap.ui.export.ExportBase(oSettings)

         // oSheet.build();
          oSheet.build().finally(function() {
            oSheet.destroy();
          });
        },
        
        createColumnConfig: function() {
          var aCols = [];
    
          aCols.push({
            label: 'Personnel No',
            property: 'PERNR',
            type: EdmType.String,
          });
          aCols.push({
              label:'Start Date',
              type:EdmType.String,
              property:'BEGDA'
            });
            aCols.push({
              label:'End Date',
              type:EdmType.String,
              property:'ENDDA'
            });
            aCols.push({
              label:'Hours',
              type:EdmType.String,
              property:'STDAZ'
            });   

          return aCols;
        }
    });
});