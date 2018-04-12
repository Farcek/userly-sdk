import { IOption as ITokenOptions } from './token';
import * as ILogin from './login';
import * as IRegister from './register';
import * as IAcl from './acl';
export interface IOption extends ITokenOptions {
    /**
     * server request timeout(secund)
     * default : 1
     */
    requestTimeout?: number;
    /**
     * userly api service base url
     * default : http://api.userly.mn
     */
    baseUrl?: string;
}
export declare class UserlySdk {
    private option;
    private token;
    private aclManager;
    constructor(option: IOption);
    readonly optionBaseUrl: string;
    readonly optionRequestTimeout: number;
    login(param: ILogin.ILoginParams): Promise<ILogin.ILoginResult>;
    loginByTokencode(tokencode: string): Promise<ILogin.ILoginResult>;
    register(params: IRegister.IRegisterParams): Promise<IRegister.IRegisterResult>;
    readonly currentToken: string;
    getACLManager(): IAcl.AclManager;
    getACL(): Promise<IAcl.IAccessTable>;
    setACL(table: IAcl.IAccessTable): Promise<IAcl.IAccessTable>;
    checkACL(roles: string[], resource: string): Promise<boolean>;
}
