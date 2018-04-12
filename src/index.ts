import { ClientToken, IOption as ITokenOptions } from './token';
import * as ILogin from './login';
import * as IRegister from './register';
import * as IAcl from './acl';


// export interface IProfileResult {
//     userid: string, name: string, confirmed: boolean, usertoken: string
// }

// export interface IUpdateProfile {
//     name: string
// }
// export interface IUpdateProfileEmail {
//     email: string
//     password: string
// }

// export interface IUpdateProfilePhone {
//     phone: string
//     password: string
// }

// export interface IUpdateProfilePassword {
//     newPass: string
//     oldPass: string
// }

export interface IOption extends ITokenOptions {

    /**
     * server request timeout(secund)
     * default : 1
     */
    requestTimeout?: number
    /**
     * userly api service base url
     * default : http://api.userly.mn
     */
    baseUrl?: string

}
export class UserlySdk {
    private token: ClientToken;
    private aclManager: IAcl.AclManager;

    constructor(private option: IOption) {
        this.token = new ClientToken(option);
        this.aclManager = new IAcl.AclManager(this.optionBaseUrl, this.token, this.optionRequestTimeout);
    }

    get optionBaseUrl() {
        return this.option.baseUrl || 'http://api.userly.mn'
    }

    get optionRequestTimeout() {
        return this.option.requestTimeout || 1
    }

    login(param: ILogin.ILoginParams) {
        return ILogin.login({
            baseUrl: this.optionBaseUrl,
            token: this.currentToken,
            requestTimeout: this.optionRequestTimeout
        }, param);
    }

    loginByTokencode(tokencode: string) {
        return ILogin.loginByTokencode({
            baseUrl: this.optionBaseUrl,
            token: this.currentToken,
            requestTimeout: this.optionRequestTimeout
        }, tokencode);
    }

    register(params: IRegister.IRegisterParams) {
        return IRegister.register({
            baseUrl: this.optionBaseUrl,
            token: this.currentToken,
            requestTimeout: this.optionRequestTimeout
        }, params)
    }

    get currentToken() {
        return this.token.currentToken;
    }

    getACLManager() {
        return this.aclManager;
    }

    getACL() {
        return IAcl.getACL({
            baseUrl: this.optionBaseUrl,
            token: this.currentToken,
            requestTimeout: this.optionRequestTimeout
        })
    }
    setACL(table: IAcl.IAccessTable) {
        return IAcl.setACL({
            baseUrl: this.optionBaseUrl,
            token: this.currentToken,
            requestTimeout: this.optionRequestTimeout
        }, table)
    }



    checkACL(roles: string[], resource: string) {
        return this.aclManager.guard(roles, resource);
    }

    // async profile(usertoken: string) {
    //     let header = {
    //         Authorization: usertoken
    //     };

    //     return await get<IProfileResult>(`${this.option.baseUrl}/profile`, header);
    // }

    // async updateProfile(usertoken: string, dta: IUpdateProfile) {
    //     let header = {
    //         Authorization: usertoken
    //     };

    //     return await put<void>(`${this.option.baseUrl}/profile`, header, dta);
    // }

    // async updateProfileEmail(usertoken: string, dta: IUpdateProfileEmail) {
    //     let header = {
    //         Authorization: usertoken
    //     };

    //     return await put<void>(`${this.option.baseUrl}/profile/email`, header, dta);
    // }
    // async updateProfilePhone(usertoken: string, dta: IUpdateProfilePhone) {
    //     let header = {
    //         Authorization: usertoken
    //     };

    //     return await put<void>(`${this.option.baseUrl}/profile/phone`, header, dta);
    // }

    // async updateProfilePassword(usertoken: string, dta: IUpdateProfilePassword) {
    //     let header = {
    //         Authorization: usertoken
    //     };

    //     return await put<void>(`${this.option.baseUrl}/profile/password`, header, dta);
    // }
}