# userly SDK v2


```typescript
import { UserlySdk } from "userly-sdk";

export const userly = new UserlySdk({
    baseUrl: 'http://api.userly.mn',
    appid: '... app id',
    privateKey: '... ssh rs256 private key',

    expiresIn: '2h',
    tokenCacheTimeout: '1m',
    requestTimeout: '1m'
});


// login

userly.login({useridentity: '',password: ''});

userly.loginByTokencode('tokenstring');



// access controll list
userly.checkACL(['admin','...','...'], 'news.create')



```