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
        this.aclManager = new IAcl.AclManager(this.optionBaseUrl, this.token, this.optionRequestTimeout);
    }
    Object.defineProperty(UserlySdk.prototype, "optionBaseUrl", {
        get: function () {
            return this.option.baseUrl || 'http://api.userly.mn';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserlySdk.prototype, "optionRequestTimeout", {
        get: function () {
            return this.option.requestTimeout || 1;
        },
        enumerable: true,
        configurable: true
    });
    UserlySdk.prototype.login = function (param) {
        return ILogin.login({
            baseUrl: this.optionBaseUrl,
            token: this.currentToken,
            requestTimeout: this.optionRequestTimeout
        }, param);
    };
    UserlySdk.prototype.loginByTokencode = function (tokencode) {
        return ILogin.loginByTokencode({
            baseUrl: this.optionBaseUrl,
            token: this.currentToken,
            requestTimeout: this.optionRequestTimeout
        }, tokencode);
    };
    UserlySdk.prototype.register = function (params) {
        return IRegister.register({
            baseUrl: this.optionBaseUrl,
            token: this.currentToken,
            requestTimeout: this.optionRequestTimeout
        }, params);
    };
    Object.defineProperty(UserlySdk.prototype, "currentToken", {
        get: function () {
            return this.token.currentToken;
        },
        enumerable: true,
        configurable: true
    });
    UserlySdk.prototype.getACLManager = function () {
        return this.aclManager;
    };
    UserlySdk.prototype.getACL = function () {
        return IAcl.getACL({
            baseUrl: this.optionBaseUrl,
            token: this.currentToken,
            requestTimeout: this.optionRequestTimeout
        });
    };
    UserlySdk.prototype.setACL = function (table) {
        return IAcl.setACL({
            baseUrl: this.optionBaseUrl,
            token: this.currentToken,
            requestTimeout: this.optionRequestTimeout
        }, table);
    };
    UserlySdk.prototype.checkACL = function (roles, resource) {
        return this.aclManager.guard(roles, resource);
    };
    return UserlySdk;
}());
exports.UserlySdk = UserlySdk;
