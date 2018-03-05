
const jwt = require('jsonwebtoken');
const ms = require('ms');


export interface IOption {

    appid: number

    privateKey: string

    expiresIn?: string

    timeout?: string

}
export class ClientToken {

    constructor(private option: IOption) { }


    private _token?: string
    get currentToken() {
        if (this._token) {
            return this._token;
        }

        let key = this.option.privateKey;
        let payload = {
            a: this.option.appid
        }
        let token:string = this._token = jwt.sign(payload, key, { jwtid: 'client', expiresIn: this.option.expiresIn, algorithm: 'RS256' });

        setTimeout(() => {
            delete this._token;
        }, ms(this.option.timeout || '1m'));

        return token;
    }
}


