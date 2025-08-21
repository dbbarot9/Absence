sap.ui.define([
    "sap/ui/core/UIComponent"
], (UIComponent) => {
    "use strict";

    return UIComponent.extend("zleavedata.Component", {
        metadata: {
            manifest: "json"
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
          //  this.setModel(models.createDeviceModel(), "device");

            // enable routing
         //   this.getRouter().initialize();
         //   UIComponent.prototype.init.apply(this);
            // define router object of UI component
             var oRouter = this.getRouter();
             oRouter.initialize();
        },
        destroy:function(){
            UIComponent.prototype.destroy.apply(this, arguments);
        }
    });
});