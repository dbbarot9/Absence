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
    'sap/ui/core/date/UI5Date',
    'sap/ui/core/format/DateFormat',
    'sap/ui/export/Spreadsheet',
    'sap/m/ObjectListItem'
  ], (BaseController,Controller,Filter,FilterOperator,ODataModel, MessageToast, SearchField, Token, compLibrary, TypeString, ColumnListItem, Label,  UIColumn, MColumn, Fragment, Text, UI5Date, DateFormat, Spreadsheet, ObjectListItem) => {
    "use strict";
  
    return Controller.extend("BaseController", {
        onInit() {
         // debugger;
         this.oRouter = this.getOwnerComponent().getRouter();
         
         
        }
       
    });
  });