const {
    getResultPrice,
    setResultPrice,
    addContactData,
    addContactPage
} = require("/renderCards.js")

const {
    data,
    editStorage,
} = require("/servisStoreg.js")

const removeErrorInput = (cardError) => {
    window.addEventListener('click', e => {
        if (e.target.classList.contains('cross__card') ||
            e.target.classList.contains('block') || e.target.classList.contains('block__connected')) {
            cardError.classList.remove('is-visible')
        }
    })
}

const getErrorInput = (id = 0) => {
    const cardError = document.querySelectorAll('.block')[id]
    cardError.classList.add('is-visible')

    removeErrorInput(cardError)
}

const getConnectedAddInput = (form, list, closeModal, target) => {
    const cardConnected = document.querySelector('.block__connected')
    cardConnected.classList.add('is-visible')

    setTimeout((e => {
        cardConnected.classList.remove('is-visible');
        const formData = new FormData(target);
        const newContact = Object.fromEntries(formData);
        addContactPage(newContact, list);
        addContactData(newContact);
        setResultPrice('span.price')
        console.log(getResultPrice(data));
        removeErrorInput(cardConnected)
        form.reset(); // очистка формы после отправки
        closeModal();
    }), 1500)
}

const getConnectedEditInput = (form, list, closeModal, target, id, product) => {
    const cardConnected = document.querySelectorAll('.block__connected')[1]
    cardConnected.classList.add('is-visible')

    setTimeout((e => {
        console.log(target)
        const formData = new FormData(target);
        const newContact = Object.fromEntries(formData);
        getErrorInput(1)
        editStorage(newContact, id, product);
        setResultPrice('span.price')
        removeErrorInput(cardConnected)
        form.reset(); // очистка формы после отправки
        closeModal();
    }), 1500)
}

const checkErrorText = () => {
    const span = document.querySelectorAll('span.error')
    span !== null ? span.forEach(e => e.remove()) : span;
}

const setErrorText = (name, text, id) => {
    const span = document.createElement('span')
    const discont = document.querySelectorAll(`input[name="discont"]`)[id]
    span.classList.add('error')
    span.textContent = text
    name.after(span)

    name !== discont ? name.after(span) : document.querySelectorAll('.connection')[id].after(span)

    window.addEventListener('click', e => {
        if (e.target === name) {
            span.remove();
            name.classList.remove('error')
        } else if (name === discont) {
            const checkBox = document.querySelectorAll('label[for="check_mark"]')[id]
            span.classList.add('discont')
            const spanD = document.querySelector('span.error.discont')
            if (e.target === checkBox) {
                discont.classList.remove('error')
                spanD !== null ? spanD.remove() : null
            }
        }
    })

    name.oninput = () => {
        span.remove();
        name.classList.remove('error')
    }
}

const checkErrorNumber = (name, id = 0, count = 10, text = 'Не более 10 цифр') => {
    name = document.querySelectorAll(`input[name=${name}]`)[id]
    if ((/[a-zA-ZА-яё]/).test(name.value)) {
        name.classList.add('error')
        return setErrorText(name, 'нельзя вводить буквы!', id)
    } else if ((/[-]/).test(name.value)) {
        name.classList.add('error')
        return setErrorText(name, 'Нельзя вводить отрецательные числа', id)
    } else if (name.value.length === 0 || +name.value === 0 || +name.value <= 0.99) {
        name.classList.add('error')
        return setErrorText(name, 'Введите число от 1', id)
    } else if (name.value.length >= count) {
        name.classList.add('error')
        return setErrorText(name, text, id)
    }

    return true
}

const checkInputText = (name, id = 0, count = 25, text = "Не больше 25 символов!") => {
    name = document.querySelectorAll(`input[name=${name}]`)[id]
    if ((/[0-9]/).test(name.value)) {
        name.classList.add('error')
        return setErrorText(name, 'нельзя вводить цифры!', id)
    } else if ((/[^a-zA-ZА-яё ""]/).test(name.value)) {
        name.classList.add('error')
        return setErrorText(name, 'Нельзя вводить спец символы!', id)
    } else if (name.value.length === 0) {
        name.classList.add('error')
        return setErrorText(name, 'Введите текст', id)
    } else if (name.value.length >= count) {
        name.classList.add('error')
        return setErrorText(name, text, id)
    }

    return true
}

const checkAddInput = (form, list, closeModal, target) => {
    const checkBox = document.querySelector('label[for="check_mark"]')

    checkErrorText()
    const name = checkInputText('name');
    const catalog = checkInputText('catalog');
    const measurement = checkInputText('measurement', 0, 3, 'Не больше 2-х символов!');
    const quantity = checkErrorNumber('quantity')
    const price = checkErrorNumber('price')

    const discont = checkBox.classList.contains('icons')
        ? checkErrorNumber('discont', 0, 3, 'Видите скидку от 0 до 99')
        : true;


    name === true && catalog === true && measurement === true && quantity === true && price === true && discont === true
        ? getConnectedAddInput(form, list, closeModal, target)
        : getErrorInput();
}


const checkEditInput = (form, list, closeModal, target, id, product) => {
    const checkBox = document.querySelectorAll('label[for="check_mark"]')[1]

    checkErrorText()
    const name = checkInputText('name', 1);
    const catalog = checkInputText('catalog', 1);
    const measurement = checkInputText('measurement', 1, 3, 'Не больше 2-х символов!');
    const quantity = checkErrorNumber('quantity', 1)
    const price = checkErrorNumber('price', 1)

    const discont = checkBox.classList.contains('icons')
        ? checkErrorNumber('discont', 1, 3, 'Видите скидку от 0 до 99')
        : true;


    name === true && catalog === true && measurement === true && quantity === true && price === true && discont === true
        ? getConnectedEditInput(form, list, closeModal, target, id, product)
        : getErrorInput(1)
}

module.exports = {
    removeErrorInput,
    getErrorInput,
    getConnectedAddInput,
    getConnectedEditInput,
    checkErrorText,
    setErrorText,
    checkErrorNumber,
    checkInputText,
    checkAddInput,
    checkEditInput
}