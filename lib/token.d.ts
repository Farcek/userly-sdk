export interface IOption {
    appid: number;
    privateKey: string;
    expiresIn?: string;
    timeout?: string;
}
export declare class ClientToken {
    private option;
    constructor(option: IOption);
    private _token?;
    readonly currentToken: string;
}
