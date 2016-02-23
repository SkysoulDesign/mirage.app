"use strict";
var frame_1 = require("ui/frame");
var Helpers_1 = require("./Helpers");
var Navigator = (function () {
    function Navigator() {
    }
    /**
     * Navigate to View
     * @param viewName
     * @param options
     */
    Navigator.prototype.to = function (viewName, options) {
        if (options === void 0) { options = {}; }
        frame_1.topmost().navigate(Helpers_1.extend({
            moduleName: Helpers_1.view(viewName),
        }, options));
    };
    /**
     * Navigate back to the previous page
     */
    Navigator.prototype.back = function () {
        frame_1.topmost().goBack();
    };
    return Navigator;
}());
exports.Navigator = Navigator;
//# sourceMappingURL=Navigator.js.map