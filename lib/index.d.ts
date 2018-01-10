import { IOption as ITokenOptions } from './token';
import * as ILogin from './login';
import * as IRegister from './register';
import * as IAcl from './acl';
export interface IOption extends ITokenOptions {
    baseUrl: string;
}
export declare class UserlySdk {
    private option;
    private token;
    private aclManager;
    constructor(option: IOption);
    login(param: ILogin.ILoginParams): Promise<ILogin.ILoginResult>;
    loginByTokencode(tokencode: string): Promise<ILogin.ILoginResult>;
    register(params: IRegister.IRegisterParams): Promise<IRegister.IRegisterResult>;
    readonly currentToken: string;
    getACL(): Promise<IAcl.IAccessTable>;
    setACL(table: IAcl.IAccessTable): Promise<IAcl.IAccessTable>;
    checkACL(roles: string[], resource: string): Promise<boolean>;
}
