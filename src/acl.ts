import * as http from './http';
import * as token from './token';
export interface ILoginOption {
    token: string
    baseUrl: string
    requestTimeout: number
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
    let header = {
        Authorization: 'Bearer ' + option.token
    };

    let result = await http.get<{ accessTable: IAccessTable }>(`${option.baseUrl}/acl-roles`, { header, timeout: option.requestTimeout });
    return result.accessTable;
}

export function setACL(option: ILoginOption, accessTable: IAccessTable) {
    let header = {
        Authorization: 'Bearer ' + option.token
    };

    return http.post<IAccessTable>(`${option.baseUrl}/acl-roles`, { header, timeout: option.requestTimeout }, { accessTable });
}

export class AclManager {

    private tableAt?: Date;

    constructor(private baseUrl: string, private token: token.ClientToken, private requestTimeout: number) {

    }


    private _table?: IAccessTable;
    private async getTable(): Promise<IAccessTable> {
        if (this._table) {
            return this._table;
        }

        return await this.reloadTable();
    }

    async reloadTable() {

        this.tableAt = new Date();
        this._table = await getACL({ baseUrl: this.baseUrl, requestTimeout: this.requestTimeout, token: this.token.currentToken });
        return this._table;
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