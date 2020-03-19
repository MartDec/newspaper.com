import { Toast } from './Toast.js';

export class FetchRequest {

    constructor(url, method = 'GET', data = null) {
        this.url = url;
        this.method = method;
        this.data = data;
    };

    fetch() {
        let params = {
            method: this.method,
            redirect: 'follow',
            mode: 'cors',
            headers: {
                'Content-Type': 'applications/json'
            }
        };

        if (this.method !== 'GET' && this.data !== null)
            params.body = JSON.stringify(this.data);

        return fetch(this.url, params)
            .then(res => {
                console.log(res);
                return res.ok ? res.json() : {error: `${res.status}: ${res.statusText}`}
            })
            .then(data => {
                if (typeof data.error === 'undefined')
                    return data;
                else
                    new Toast('error', data.error).show();
            })
            .catch(err => console.error(err));
    }

}