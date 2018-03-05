import * as http from './http';
import * as token from './token';

const debug = require('debug')('userly-sdk');


export interface ILoginOption {
    token: string
    baseUrl: string
}
export interface IAccessRole {
    parents: string[]
    permissions: string[]
}
export interface IAccessTable {
    [role: string]: IAccessRole
}

export interface IACLResult {
    appid: number
    appname: string
    accessTable: IAccessTable
}

export async function getACL(option: ILoginOption) {

    debug('call getACL')
    let header = {
        Authorization: 'Bearer ' + option.token
    };

    let result = await http.get<{ accessTable: IAccessTable }>(`${option.baseUrl}/acl-roles`, header);
    return result.accessTable;
}

export function setACL(option: ILoginOption, accessTable: IAccessTable) {
    let header = {
        Authorization: 'Bearer ' + option.token
    };

    return http.post<IAccessTable>(`${option.baseUrl}/acl-roles`, header, { accessTable });
}

export class AclManager {
    
    constructor(private baseUrl: string, private token: token.ClientToken) {
        debug('create instance AclManager')
    }


    private _table: IAccessTable | null = null;
    private async getTable(): Promise<IAccessTable> {
        if (this._table) {
            debug('AclManager.getTable from cache')
            return this._table;
        }
        let at = this._table = await getACL({ baseUrl: this.baseUrl, token: this.token.currentToken });
        debug('AclManager.getTable from loading')
        return at;
    }

    private test(table: IAccessTable, role: string, resource: string) {
        if (role in table) {
            let currRole = table[role];
            if (Array.isArray(currRole.permissions)) {
                for (let per of currRole.permissions) {
                    if (resource === per) {
                        return true;
                    }
                }
            }

            if (Array.isArray(currRole.parents)) {
                for (let par of currRole.parents) {
                    if (this.test(table, par, resource)) {
                        return true;
                    }
                }
            }

        }
        return false;

    }

    async guard(roles: string[], resource: string): Promise<boolean> {

        if (Array.isArray(roles)) {
            let table = await this.getTable()
            for (let par of roles) {                
                if (this.test(table, par, resource)) {
                    return true;
                }
            }
        }
        return false
    }
}