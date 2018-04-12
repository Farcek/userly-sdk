import * as http from './http';
export interface IRegisterOption {
    token: string
    baseUrl: string

    requestTimeout: number
}

export interface IRegisterParams {
    name: string
    useridentity: string
    password: string
}

export interface IRegisterResult {
    userid: string
}


export function register(option: IRegisterOption, params: IRegisterParams) {
    let header = {
        Authorization: 'Bearer ' + option.token
    };

    return http.post<IRegisterResult>(`${option.baseUrl}/register`, { header, timeout: option.requestTimeout }, params);
}