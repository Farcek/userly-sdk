const debug = require('debug')('userly-sdk:token');
const jwt = require('jsonwebtoken');
const ms = require('ms');


export interface IOption {

    /**
     * userly appid
     */
    appid: number

    /**
     * client private key
     * ssh2 RS256 private key
     */
    privateKey: string

    /**
     * token expires at
     */
    expiresIn?: string

    /**
     * token cache timepout
     * ex : 1m, 30s
     * default : 1m
     */
    tokenCacheTimeout?: string

}
export class ClientToken {

    constructor(private option: IOption) { }


    private _token: string = '';
    get currentToken() {
        if (this._token) {
            debug('token use from cache')
            return this._token;
        }

        let key = this.option.privateKey;
        let payload = {
            a: this.option.appid
        }
        this._token = jwt.sign(payload, key, { jwtid: 'client', expiresIn: this.option.expiresIn, algorithm: 'RS256' });
        debug('token use generated')

        setTimeout(() => {
            delete this._token;
            debug('used cache clear')
        }, ms(this.option.tokenCacheTimeout || '1m'));

        return this._token;
    }
}


