sap.ui.define([
	"fis/tgh/__project__/__component__/controller/BaseController",
	"fis/tgh/__project__/__component__/model/formatter",
	"fis/tgh/__project__/__component__/helper/util",
], function(BaseController, formatter, util) {
	"use strict";

	return BaseController.extend("fis.tgh.__project__.__component__.controller.Main", {

		formatter: formatter,
		util: util,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the controller is instantiated.
		 * @public
		 */
		onInit: function() {
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */
	});
});