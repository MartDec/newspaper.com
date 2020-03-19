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
            mode: 'cors'
        };

        if (this.method !== 'GET' && this.data !== null)
            params.body = this.data;

        let request = new Request(this.url, params);
        return fetch(request)
            .then(res => res.ok ? res.json() : {error: `${res.status}: ${res.statusText}`})
            .then(data => {
                if (typeof data.error === 'undefined')
                    return data;
                else
                    new Toast('error', data.error).show();
            })
            .catch(err => console.error(err));
    }

}