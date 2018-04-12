"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require('jsonwebtoken');
var ms = require('ms');
var ClientToken = /** @class */ (function () {
    function ClientToken(option) {
        this.option = option;
        this._token = '';
    }
    Object.defineProperty(ClientToken.prototype, "currentToken", {
        get: function () {
            var _this = this;
            if (this._token) {
                return this._token;
            }
            var key = this.option.privateKey;
            var payload = {
                a: this.option.appid
            };
            this._token = jwt.sign(payload, key, { jwtid: 'client', expiresIn: this.option.expiresIn, algorithm: 'RS256' });
            setTimeout(function () {
                delete _this._token;
            }, ms(this.option.tokenCacheTimeout || '1m'));
            return this._token;
        },
        enumerable: true,
        configurable: true
    });
    return ClientToken;
}());
exports.ClientToken = ClientToken;
