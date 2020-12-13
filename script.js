define("lib/helpers", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.l = void 0;
    exports.l = function (message) { return console.log(message); };
});
define("index", ["require", "exports", "lib/helpers"], function (require, exports, helpers_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    helpers_1.l('test');
});
