const request = require('request');
export async function get<T>(uri: string, header: any) {
    return new Promise<T>((resolve, reject) => {
        request({
            uri,
            method: 'GET',
            headers: header || {},
            json: true,
            timeout: 1000
        }, (err: any, response: any, body: any) => {
            if (err) {
                return reject(err);
            }
            if (response && response.statusCode === 200) {
                return resolve(body)
            }
            reject(body);
        });
    });
}

export async function post<T>(uri: string, header: any, params: any) {
    return new Promise<T>((resolve, reject) => {
        request({
            uri,
            method: 'POST',
            headers: header || {},
            json: true,
            body: params,
            timeout: 1000
        }, (err: any, response: any, body: any) => {
            if (err) {
                return reject(err);
            }
            if (response && response.statusCode === 200) {
                return resolve(body)
            }
            reject(body);
        });
    });
}

export async function put<T>(uri: string, header: any, params: any) {
    return new Promise<T>((resolve, reject) => {
        request({
            uri,
            method: 'PUT',
            headers: header || {},
            json: true,
            body: params,
            timeout: 1000
        }, (err: any, response: any, body: any) => {
            if (err) {
                return reject(err);
            }
            if (response && response.statusCode === 200) {
                return resolve(body)
            }
            reject(body);
        });
    });

}
