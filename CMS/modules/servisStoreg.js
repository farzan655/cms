"use strict";

const getStoreg = (name) => localStorage.getItem(name) && name === 'data' ? JSON.parse(localStorage.getItem('data'))
    : [];

const data = getStoreg('data')

const setStorage = () => {
    localStorage.setItem('data', JSON.stringify(data))
    return getStoreg();
};

const editStorage = (contact, id, product) => {
    id.children[1].textContent = product.name = contact.name;
    id.children[2].textContent = product.catalog = contact.catalog;
    product['discont'] = document.querySelectorAll('.text-checkbox')[1].value;
    product.option = document.querySelectorAll('textarea')[1].value
    id.children[3].textContent = product.measurement = contact.measurement;
    id.children[4].textContent = product.quantity = contact.quantity;
    id.children[5].textContent = product.price = `$${contact.price}`
    const isPrise = +product.price == product.price.toString() ? product.price : product.price.slice(1);
    const isDiscont = product.discont !== undefined
        ? ((isPrise * product.quantity) * product.discont / 100)
        : 0;
    id.children[6].textContent = `$${isPrise * contact.quantity - isDiscont}`
    setStorage()
}

const removeStorage = (btnDel, list) => {
    list.addEventListener('click', e => {
        const target = e.target;
        if (target.closest('.del')) {
            let product = data.findIndex(e => {
                let id = target.parentElement.parentElement.parentElement
                return e.id === id.children[0].textContent
            })
            const price = data[product]['price']
            const isPrise = price.charAt(0) !== '$' ? +data[product]['price'] : +data[product]['price'].slice(1);
            const span = document.querySelector('span.price')
            const percent = data[product]['discont'] === undefined ? 0
                : isPrise * +data[product]['quantity'] * +data[product]['discont'] / 100
            const itog = isPrise * +data[product]['quantity'] - percent;
            const result = +span.textContent.slice(1) - itog
            span.textContent = `$${result}`
            target.closest('.contact').remove();
            data.splice(product, 1)
            setStorage();
        }
    });
}

module.exports = {
    getStoreg,
    data,
    setStorage,
    editStorage,
    removeStorage
}