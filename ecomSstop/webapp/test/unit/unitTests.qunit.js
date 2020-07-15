/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ink/trng/proj/ecomSstop/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});