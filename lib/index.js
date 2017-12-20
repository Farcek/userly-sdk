"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var token_1 = require("./token");
var ILogin = require("./login");
var IRegister = require("./register");
var UserlySdk = (function () {
    function UserlySdk(option) {
        this.option = option;
        this.token = new token_1.ClientToken(option);
    }
    UserlySdk.prototype.login = function (param) {
        return ILogin.login({
            baseUrl: this.option.baseUrl,
            token: this.token.currentToken
        }, param);
    };
    UserlySdk.prototype.register = function (params) {
        return IRegister.register({
            baseUrl: this.option.baseUrl,
            token: this.token.currentToken
        }, params);
    };
    return UserlySdk;
}());
exports.UserlySdk = UserlySdk;
