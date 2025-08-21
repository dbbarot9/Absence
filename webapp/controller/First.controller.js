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
  'sap/ui/export/Spreadsheet',
  'sap/m/ObjectListItem'
], (BaseController,Controller,Filter,FilterOperator,ODataModel, MessageToast, SearchField, Token, compLibrary, TypeString, ColumnListItem, Label,  UIColumn, MColumn, Fragment, Text, Spreadsheet, ObjectListItem) => {
  "use strict";

  return Controller.extend("BaseController", {
      onInit() {
       // debugger;
       this.oRouter = this.getOwnerComponent().getRouter();
       
        var oList = this.getView().byId("idList");
        var oTemplate = new sap.m.ObjectListItem({
          title: {
              path: "ktext",
              intro: "Leave Info",  
              formatter: function (desc) {
                  return desc; // Emphasize description
              }
          },
          
          number: {
              path: "kverb",
              numberUnit: "hrs",
              formatter: function (v) {
                  return parseFloat(v).toFixed(2) + " Hrs left"; // Total leave
              }
          },type: "Active",
      
          numberState: {
              path: "kverb",
              formatter: function (v) {
                  if (v > 100) return "Success";     // Green for lots of leave
                  if (v >= 50) return "Warning";     // Orange
                  return "None";                     // Default
              }
          },
      
          // Colored kverb (leave taken) in status line for emphasis
          firstStatus: new sap.m.ObjectStatus({
              text: {
                  path: "anzhl",
                  numberUnit: "hrs",
                  formatter: function (v) {
                      return "Total:" + parseFloat(v).toFixed(2) + " Hrs";
                  }
              },
              state: {
                  path: "anzhl",
                  formatter: function (v) {
                      if (v > 100) return "Success";        // Too much used?
                      if (v >= 50) return "Warning";
                      return "None";                   // Green = okay
                  }
              }
          }),
      
          // Date range in second status or attribute
          attributes: [
            new sap.m.ObjectAttribute({
              title: "Start",
              text: {
                  path: "desta",
                  formatter: function (val) {
                    //    var fmt = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "MMM dd, yyyy" });
                        return val;
                    }
              }
          }),
          new sap.m.ObjectAttribute({
            title: "End",
            text: {
                path: "deend",
                formatter: function (val) {
                //    var fmt = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "MMM dd, yyyy" });
                    return val;
                }
            }
        })
          ]
      });
      
        
        var oFilter3 = new Filter("pernr", FilterOperator.EQ, '40116');
        // Bind items without filters first
        var oBinding = this.getView().byId("idList").bindItems({
          path: "/TimeaccountSet",
          template: oTemplate
       //   filters: oFilter3
        });
        
      
      },
      callView1:function(){
        // var oAppView = this.getView().getParent().getParent();
        // var oEmpty = oAppView.getDetailPages()[0];
        // oAppView.to(oEmpty);
      //  debugger;
      //  this.oRouter = this.getOwnerComponent().getRouter();
      //  this.oRouter.navTo("home");
      var oHistory = History.getInstance();
   var sPreviousHash = oHistory.getPreviousHash();
   if (sPreviousHash !== undefined) {
     window.history.go(-1);
   } else {
     var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
     oRouter.navTo("home");
   }
     },
      onItemSelect: function(oEvent)
      {
        debugger;
          // Get selected item
        var oItem = oEvent.getParameter("listItem") || oEvent.getSource();
        var oModel = this.getView().getModel();
          // Get binding context path
        var sPath = oItem.getBindingContext().getPath();
        // Get specific property value, e.g. 'ID' or 'Name'
        var sIdVal = oModel.getProperty(sPath + "/ktext");
       // this._selectedText = sIdVal;
        var oSelectedItem = oEvent.getParameter("listItem");
        var saddress = oSelectedItem.getBindingContextPath();
        var sMyid = saddress.split("/")[saddress.split("/").length - 1];
      //  var sMytxt = "/" + sIdVal;
        this.onNext(sMyid);
        this.oRouter.navTo("RouteTo",{
          leave:sMyid
       //   ktext: sMytxt
        });
      },
			onListItemPress: function(oEvent){
      //  debugger;
     //  var oSelectedItem = oEvent.getParameter("listItem");
     //  var saddress = oSelectedItem.getBindingContextpath();
     //  console.log(saddress);
      
      },
      onNext: function(leaves){
        this.oRouter.navTo("RouteTo",{
          leave: leaves
        });
      }
  });
});