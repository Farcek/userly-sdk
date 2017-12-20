

import { ClientToken, IOption as ITokenOptions } from './token';
import * as ILogin from './login';
import * as IRegister from './register';


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

    baseUrl: string

}
export class UserlySdk {
    private token: ClientToken;

    constructor(private option: IOption) {

        this.token = new ClientToken(option);

    }

    login(param: ILogin.ILoginParams) {
        return ILogin.login({
            baseUrl: this.option.baseUrl,
            token: this.token.currentToken
        }, param);
    }

    register(params: IRegister.IRegisterParams) {
        return IRegister.register({
            baseUrl: this.option.baseUrl,
            token: this.token.currentToken
        }, params)
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