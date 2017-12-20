"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("./http");
function register(option, params) {
    var header = {
        Authorization: 'Bearer ' + option.token
    };
    return http.post(option.baseUrl + "/register", header, params);
}
exports.register = register;
