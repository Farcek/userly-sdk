import { IOption as ITokenOptions } from './token';
import * as ILogin from './login';
import * as IRegister from './register';
export interface IOption extends ITokenOptions {
    baseUrl: string;
}
export declare class UserlySdk {
    private option;
    private token;
    constructor(option: IOption);
    login(param: ILogin.ILoginParams): Promise<ILogin.ILoginResult>;
    register(params: IRegister.IRegisterParams): Promise<IRegister.IRegisterResult>;
}
