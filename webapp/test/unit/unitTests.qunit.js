/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"zleavedata/hcm/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
