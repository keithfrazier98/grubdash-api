"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(error, request, response, next) {
    // console.error(error);  // Commented out to silence tests.
    var _a = error.status, status = _a === void 0 ? 500 : _a, _b = error.message, message = _b === void 0 ? "Something went wrong!" : _b;
    response.status(status).json({ error: message });
}
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map