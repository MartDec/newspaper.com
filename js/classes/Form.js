export class Form {
    constructor(selector) {
        this.element = document.querySelector(selector);
        this.method = this.element.method.toUpperCase();
        this.api = 'https://newsapp.dwsapp.io/api';
    };
}