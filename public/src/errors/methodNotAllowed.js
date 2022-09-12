"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function methodNotAllowed(request, response, next) {
    next({
        status: 405,
        message: "".concat(request.method, " not allowed for ").concat(request.originalUrl),
    });
}
exports.default = methodNotAllowed;
//# sourceMappingURL=methodNotAllowed.js.map