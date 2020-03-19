import {FetchRequest} from './classes/FetchRequest.js';

document.addEventListener('DOMContentLoaded', () => {

    // const api = 'https://newsapp.dwsapp.io/api/news/sources';
    const api = 'https://api.dwsapp.io/api/';

    const userFormsLinks = document.querySelectorAll('a.user-form-link');
    const userForms = document.querySelectorAll('.user-form');
    const bodyDisabler = document.querySelector('#disable-body');



    const hideForm = form => {
        const formCloser = form.querySelector('.close-form');
        formCloser.addEventListener('click', e => {
            e.preventDefault();

            form.classList.add('d-none');
            bodyDisabler.classList.add('d-none');
        });

        bodyDisabler.addEventListener('click', () => {
            form.classList.add('d-none');
            bodyDisabler.classList.add('d-none');
        })
    };

    const displayUserForms = e => {
        e.preventDefault();

        const formAction = e.target.getAttribute('href');
        const form = document.querySelector(`form[action="${formAction}"]`);
        form.classList.remove('d-none');
        bodyDisabler.classList.remove('d-none');
        hideForm(form);
    };

    const getFormData = form => {
        const inputs = form.querySelectorAll('input');
        let data = {};
        for (let input of inputs) {
            data[input.getAttribute('name')] = input.value;
        }

        return data;
    };


    const submitUserForm = async e => {
        e.preventDefault();

        const data = getFormData(e.target);
        const action = e.target.getAttribute('action');
        let response = await new FetchRequest(`${api}${action}`, 'POST', data).fetch();
        console.log(response);
    };



    for (let link of userFormsLinks) {
        link.addEventListener('click', displayUserForms);
    }

    for (let form of userForms) {
        form.addEventListener('submit', submitUserForm);
    }

});