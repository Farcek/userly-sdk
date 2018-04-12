export interface IRegisterOption {
    token: string;
    baseUrl: string;
    requestTimeout: number;
}
export interface IRegisterParams {
    name: string;
    useridentity: string;
    password: string;
}
export interface IRegisterResult {
    userid: string;
}
export declare function register(option: IRegisterOption, params: IRegisterParams): Promise<IRegisterResult>;
