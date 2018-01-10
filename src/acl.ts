import * as http from './http';
import * as token from './token';
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

    }


    private _table?: IAccessTable;
    private async getTable(): Promise<IAccessTable> {
        if (this._table) {
            return this._table;
        }

        let result = await getACL({ baseUrl: this.baseUrl, token: this.token.currentToken });

        return result;
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
                console.log('par', par)
                if (this.test(table, par, resource)) {
                    return true;
                }
            }
        }
        return false
    }
}