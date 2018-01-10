"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("./http");
function login(option, params) {
    var header = {
        Authorization: 'Bearer ' + option.token
    };
    return http.post(option.baseUrl + "/login", header, params);
}
exports.login = login;
function loginByTokencode(option, tokencode) {
    var header = {
        Authorization: 'Bearer ' + option.token
    };
    return http.post(option.baseUrl + "/login-tokencode", header, { tokencode: tokencode });
}
exports.loginByTokencode = loginByTokencode;
