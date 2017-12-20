export interface ILoginOption {
    token: string;
    baseUrl: string;
}
export interface ILoginParams {
    userIdentity: string;
    password: string;
}
export interface ILoginResult {
    userid: string;
    name: string;
    confirmed: boolean;
}
export declare function login(option: ILoginOption, params: ILoginParams): Promise<ILoginResult>;
