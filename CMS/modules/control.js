const {
    checkAddInput,
    checkEditInput
} = require('./falidationInput.js')

const {
    getPriceForm,
    setTextForm,
} = require("./renderCards.js")

const {
    data,
} = require("./servisStoreg.js")

const modalControl = (form, btnAdd, formOverlay) => {
    const openModal = () => {
        formOverlay.classList.add('is-visible');

        const form = document.querySelector('.form')
        const quantity = document.querySelector('.quantity')
        const file = document.querySelector('.file')
        let result = document.querySelector('span.price_result')
        const checkbox = document.querySelector('label[for="check_mark"]')
        const inputDiscont = document.querySelector('.text-checkbox')

        getPriceForm(form, quantity, file, result, checkbox, inputDiscont);

    };
    const closeModal = () => {
        formOverlay.classList.remove('is-visible');
        document.querySelector('span.price_result').textContent = `$0`
    };
    btnAdd.addEventListener('click', openModal);

    // блокировка всплытия событий
    // form.addEventListener('click', e => {
    //     e.stopPropagation();
    // })
    formOverlay.addEventListener('click', (e) => {
        const target = e.target;
        if (target === formOverlay || target.classList.contains('close')) {
            form.reset()
            document.querySelectorAll('input').forEach(e => e.classList.remove('error'))
            document.querySelectorAll('span.error').forEach(e => e.remove())
            closeModal();
        }
    });
    return {
        closeModal,
    };
};

const modalControlEdit = (formEdit, btnEdit, formOverlayEdit) => {

    let id;
    const openModal = (target, product, id) => {
        formOverlayEdit.classList.add('is-visible');
        setTextForm(target, product);

        const form = document.querySelectorAll('.form')[1]
        const quantity = document.querySelectorAll('.quantity')[1]
        const file = document.querySelectorAll('.file')[1]
        let result = document.querySelectorAll('span.price_result')[1]
        const checkbox = document.querySelectorAll('label[for="check_mark"]')[1]
        const inputDiscont = document.querySelectorAll('.text-checkbox')[1]


        getPriceForm(form, quantity, file, result, checkbox, inputDiscont);
    };
    const closeModalEdit = () => {
        formOverlayEdit.classList.remove('is-visible');
        document.querySelectorAll('input').forEach(e => e.classList.remove('error'))
        document.querySelectorAll('span.error').forEach(e => e.remove())
    };
    window.addEventListener('click', e => {
        const target = e.target;
        if (target.classList.contains('edit')) {
            id = target.parentElement.parentElement.parentElement
            let product = data.find(e => {
                return e.id === id.children[0].textContent
            })
            openModal(target, product, id)
        }
    });

    // блокировка всплытия событий
    // form.addEventListener('click', e => {
    //     e.stopPropagation();
    // })

    formOverlayEdit.addEventListener('click', (e) => {
        const target = e.target;
        if (target === formOverlayEdit || target.classList.contains('close')) {
            formEdit.reset()
            closeModalEdit();
        }
    });

    return {
        closeModalEdit,
    };
};

const formControl = (form, list, closeModal) => {
    form.addEventListener('submit', e => {
        e.preventDefault();
        checkAddInput(form, list, closeModal, e.target)
    });
};

const formControlEdit = (form, list, closeModal) => {

    let id, product

    window.addEventListener('click', e => {
        const target = e.target;
        if (target.classList.contains('edit')) {
            id = target.parentElement.parentElement.parentElement
            product = data.find(e => {
                return e.id === id.children[0].textContent
            })
        }
    });

    form.addEventListener('submit', e => {
        e.preventDefault();
        checkEditInput(form, list, closeModal, e.target, id, product)
    });
};

module.exports = {
    modalControl,
    modalControlEdit,
    formControl,
    formControlEdit
}