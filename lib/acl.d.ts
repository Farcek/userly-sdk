import * as token from './token';
export interface ILoginOption {
    token: string;
    baseUrl: string;
    requestTimeout: number;
}
export interface IAccessRole {
    parents: string[];
    permissions: string[];
}
export interface IAccessTable {
    [role: string]: IAccessRole;
}
export interface IACLResult {
    appid: number;
    appname: string;
    accessTable: IAccessTable;
}
export declare function getACL(option: ILoginOption): Promise<IAccessTable>;
export declare function setACL(option: ILoginOption, accessTable: IAccessTable): Promise<IAccessTable>;
export declare class AclManager {
    private baseUrl;
    private token;
    private requestTimeout;
    tableAt?: Date;
    constructor(baseUrl: string, token: token.ClientToken, requestTimeout: number);
    private _table?;
    private getTable();
    reloadTable(): Promise<IAccessTable>;
    private test(table, role, resource);
    guard(roles: string[], resource: string): Promise<boolean>;
}
