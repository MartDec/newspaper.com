import {FetchRequest} from './classes/FetchRequest.js'
import {UserForm} from './classes/UserForm.js';
import {Toast} from './classes/Toast.js';
import { Form } from './classes/Form.js';

document.addEventListener('DOMContentLoaded', () => {

    const registerForm = new UserForm('.user-form[action="register"]');
    const loginForm = new UserForm('.user-form[action="login"]');
    const sourcesForm = new Form('#sources-form');

    sourcesForm.element.addEventListener('submit', e => {
        e.preventDefault();
        
        const selectedSource = e.target.options[e.target.selectedIndex].value;
        console.log(selectedSource);
    });

    const sourceSelect = document.querySelector('#source-list');

    const api = 'https://newsapp.dwsapp.io/api/';

    const getSources = async () => {
        let sources = await new FetchRequest(`${api}news/sources/`).fetch();
        if (sources.err === null) {
            return sources.data.sources;
        } else {
            new Toast('error', sources.err).show();
        }
    }

    const createSourceOptions = sources => {
        for (let source of sources) {
            let option = document.createElement('option');
            option.value = source.id;
            option.innerText = source.name;
            sourceSelect.appendChild(option);
        }
    }

    const getOptions = async () => {
        const sources = await getSources();
        createSourceOptions(sources);
    };

    registerForm.element.addEventListener('submit', async e => {
        e.preventDefault();
        const response = await registerForm.submit();
        console.log(response);
    });

    loginForm.element.addEventListener('submit', async e => {
        e.preventDefault();
        const response = await loginForm.submit();
        console.log(response);
    });
    
    getOptions();

});