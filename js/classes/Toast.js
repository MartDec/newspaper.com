export class Toast {

    constructor(type, message) {
        this.type = type;
        this.message = message;
    };

    show() {
        let element = document.createElement('div');
        element.classList.add('toast');
        element.classList.add(`toast-${this.type}`);
        element.innerText = this.message;

        document.body.appendChild(element);
        setTimeout(() => {
            document.body.removeChild(document.querySelector('.toast'));
        }, 3000);
    }

}
