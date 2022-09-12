"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function notFound(request, response, next) {
    next({ status: 404, message: "Path not found: ".concat(request.originalUrl) });
}
exports.default = notFound;
//# sourceMappingURL=notFound.js.map