export interface IOption {
    /**
     * userly appid
     */
    appid: number;
    /**
     * client private key
     * ssh2 RS256 private key
     */
    privateKey: string;
    /**
     * token expires at
     */
    expiresIn?: string;
    /**
     * token cache timepout
     * ex : 1m, 30s
     * default : 1m
     */
    tokenCacheTimeout?: string;
}
export declare class ClientToken {
    private option;
    constructor(option: IOption);
    private _token?;
    readonly currentToken: string;
}
