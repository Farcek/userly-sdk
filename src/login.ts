import * as http from './http';
export interface ILoginOption {
    token: string
    baseUrl: string
}

export interface ILoginParams {
    useridentity: string
    password: string
}

export interface ILoginResult {
    userid: string
    name: string
    confirmed: boolean
    roles: string[]
}


export function login(option: ILoginOption, params: ILoginParams) {
    let header = {
        Authorization: 'Bearer ' + option.token
    };

    return http.post<ILoginResult>(`${option.baseUrl}/login`, header, params);
}
export function loginByTokencode(option: ILoginOption, tokencode: string) {
    let header = {
        Authorization: 'Bearer ' + option.token
    };

    return http.post<ILoginResult>(`${option.baseUrl}/login-tokencode`, header, { tokencode });
}