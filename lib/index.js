"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var token_1 = require("./token");
var ILogin = require("./login");
var IRegister = require("./register");
var IAcl = require("./acl");
var UserlySdk = /** @class */ (function () {
    function UserlySdk(option) {
        this.option = option;
        this.token = new token_1.ClientToken(option);
        this.aclManager = new IAcl.AclManager(option.baseUrl, this.token);
    }
    UserlySdk.prototype.login = function (param) {
        return ILogin.login({
            baseUrl: this.option.baseUrl,
            token: this.currentToken
        }, param);
    };
    UserlySdk.prototype.loginByTokencode = function (tokencode) {
        return ILogin.loginByTokencode({
            baseUrl: this.option.baseUrl,
            token: this.currentToken
        }, tokencode);
    };
    UserlySdk.prototype.register = function (params) {
        return IRegister.register({
            baseUrl: this.option.baseUrl,
            token: this.currentToken
        }, params);
    };
    Object.defineProperty(UserlySdk.prototype, "currentToken", {
        get: function () {
            return this.token.currentToken;
        },
        enumerable: true,
        configurable: true
    });
    UserlySdk.prototype.getACL = function () {
        return IAcl.getACL({
            baseUrl: this.option.baseUrl,
            token: this.currentToken
        });
    };
    UserlySdk.prototype.setACL = function (table) {
        return IAcl.setACL({
            baseUrl: this.option.baseUrl,
            token: this.currentToken
        }, table);
    };
    UserlySdk.prototype.checkACL = function (roles, resource) {
        return this.aclManager.guard(roles, resource);
    };
    return UserlySdk;
}());
exports.UserlySdk = UserlySdk;
