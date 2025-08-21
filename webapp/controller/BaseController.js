sap.ui.define(['sap/ui/core/mvc/Controller','zleavedata/util/formatter'
], function(Controller,myFormatter) {
    'use strict';
    return Controller.extend('zleavedata.controller.BaseController',{
      
        formatter:myFormatter
    });
    
});