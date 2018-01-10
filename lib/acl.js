"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("./http");
function getACL(option) {
    return __awaiter(this, void 0, void 0, function () {
        var header, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    header = {
                        Authorization: 'Bearer ' + option.token
                    };
                    return [4 /*yield*/, http.get(option.baseUrl + "/acl-roles", header)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.accessTable];
            }
        });
    });
}
exports.getACL = getACL;
function setACL(option, accessTable) {
    var header = {
        Authorization: 'Bearer ' + option.token
    };
    return http.post(option.baseUrl + "/acl-roles", header, { accessTable: accessTable });
}
exports.setACL = setACL;
var AclManager = (function () {
    function AclManager(baseUrl, token) {
        this.baseUrl = baseUrl;
        this.token = token;
    }
    AclManager.prototype.getTable = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._table) {
                            return [2 /*return*/, this._table];
                        }
                        return [4 /*yield*/, getACL({ baseUrl: this.baseUrl, token: this.token.currentToken })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    AclManager.prototype.test = function (table, role, resource) {
        if (role in table) {
            var currRole = table[role];
            if (Array.isArray(currRole.permissions)) {
                for (var _i = 0, _a = currRole.permissions; _i < _a.length; _i++) {
                    var per = _a[_i];
                    if (resource === per) {
                        return true;
                    }
                }
            }
            if (Array.isArray(currRole.parents)) {
                for (var _b = 0, _c = currRole.parents; _b < _c.length; _b++) {
                    var par = _c[_b];
                    if (this.test(table, par, resource)) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    AclManager.prototype.guard = function (roles, resource) {
        return __awaiter(this, void 0, void 0, function () {
            var table, _i, roles_1, par;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!Array.isArray(roles)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getTable()];
                    case 1:
                        table = _a.sent();
                        for (_i = 0, roles_1 = roles; _i < roles_1.length; _i++) {
                            par = roles_1[_i];
                            console.log('par', par);
                            if (this.test(table, par, resource)) {
                                return [2 /*return*/, true];
                            }
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/, false];
                }
            });
        });
    };
    return AclManager;
}());
exports.AclManager = AclManager;
