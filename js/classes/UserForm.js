import { FetchRequest } from './FetchRequest.js';
import { Form } from './Form.js';

export class UserForm extends Form {

    constructor(selector) {
        super(selector);
        this.action = this.element.getAttribute('action');
        this.closeBtn = this.element.querySelector('.close-form');
        this.displayBtn = document.getElementById(this.action);

        this.setListeners();
    };

    getData() {
        const inputs = this.element.querySelectorAll('input');
        let data = {};
        for (let input of inputs) {
            data[input.getAttribute('name')] = input.value;
        }

        return data;
    };

    async submit() {
        const data = this.getData();
        const url = `${this.api}/${this.action}`;

        return await new FetchRequest(url, this.method, data).fetch();
    };

    setHideListener() {
        this.closeBtn.addEventListener('click', () => {
            this.element.classList.add('d-none');
        });
    };

    setDisplayListener() {
        this.displayBtn.addEventListener('click', e => {
            e.preventDefault();
            this.element.classList.remove('d-none');
        })
    }

    setListeners() {
        this.setDisplayListener();
        this.setHideListener();
    }

}