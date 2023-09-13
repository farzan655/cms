'use strict';

const {
    modalControl,
    modalControlEdit,
    formControl,
    formControlEdit
} = require('../modules/control.js')

const {
    getClick
} = require("../modules/disebleClick.js");

const {
    renderContacts,
    renderPhoneBook,
} = require("../modules/renderCards.js")

const {
    data,
    removeStorage
} = require("../modules/servisStoreg.js")

const init = (selectorApp) => {
    const app = document.querySelector(selectorApp);

    const {
        list, btnAdd, formOverlay, overlayEdit, form, formEdit
    } = renderPhoneBook(app);

    // функционал
    renderContacts(list, data);

    const {closeModal} = modalControl(form, btnAdd, formOverlay);
    const {closeModalEdit} = modalControlEdit(formEdit, document.querySelector('edit'), overlayEdit)

    const inputDisabled = document.querySelector('.text-checkbox');
    const btnLabel = document.querySelector('.container .one-five .checkbox+label');
    const inputDisabledEdit = document.querySelectorAll('.text-checkbox')[1];
    const btnLabelEdit = document.querySelectorAll('.container .one-five .checkbox+label')[1];

    getClick(btnLabel, inputDisabled);
    getClick(btnLabelEdit, inputDisabledEdit);

    removeStorage(document.querySelector('.del'), list, app);
    formControl(form, list, closeModal, app);
    formControlEdit(formEdit, list, closeModalEdit, overlayEdit, app)

    document.addEventListener('touchstart', e => {
        console.log(e.type);
    });
    document.addEventListener('touchmove', e => {
        console.log(e.type);
    });
    document.addEventListener('touchend', e => {
        console.log(e.type);
    });
    // ========================
};

window.phoneBookInit = init;