export interface ILoginOption {
    token: string;
    baseUrl: string;
    requestTimeout: number;
}
export interface ILoginParams {
    useridentity: string;
    password: string;
}
export interface ILoginResult {
    userid: string;
    name: string;
    confirmed: boolean;
    roles: string[];
}
export declare function login(option: ILoginOption, params: ILoginParams): Promise<ILoginResult>;
export declare function loginByTokencode(option: ILoginOption, tokencode: string): Promise<ILoginResult>;
