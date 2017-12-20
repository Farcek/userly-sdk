import * as http from './http';
export interface ILoginOption {
    token: string
    baseUrl: string
}

export interface ILoginParams {
    userIdentity: string
    password: string
}

export interface ILoginResult {
    userid: string, name: string, confirmed: boolean
}


export function login(option: ILoginOption, params: ILoginParams) {
    let header = {
        Authorization: 'Bearer ' + option.token
    };

    return http.post<ILoginResult>(`${option.baseUrl}/login`, header, params);
}