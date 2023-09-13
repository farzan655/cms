const {
    createContainer,
    createHeader,
    createMain,
    createNavGroup,
    createTable,
    createForm,
    createFormEdit,
    errorCard,
    connectedCard,
    sectionTable
} = require("./createElemets.js")

const {
    data,
    setStorage,
} = require("./servisStoreg.js")

const getResultPrice = (data) => {
    let count = 0;

    console.log(data)

    data.forEach(element => {
        const isPrise = +element.price == element.price.toString() ? element.price
            : element.price.slice(1);

        const isDiscont = element.discont !== undefined
            ? ((isPrise * element.quantity) * element.discont / 100).toFixed(2)
            : 0;


        count += element.quantity * isPrise - isDiscont
        console.log(isDiscont)
    })

    return count
}

const addContactData = contact => {
    data.push(contact);
    setStorage()
    console.log(data)
};

const setResultPrice = (name) => document.querySelector(name).textContent = `$${getResultPrice(data)}`;

const getPriceForm = (form, quantity, file, result, checkbox, inputDiscont) => {

    let count = 0

    form.addEventListener('click', event => {
            if (!checkbox.classList.contains('icons')) {

                result.textContent = `$${+file.value * +quantity.value}`
                file.oninput = e => {
                    quantity.oninput = i => {
                        result.textContent = `$${+e.target.value * +i.target.value}`
                        count = +e.target.value * +i.target.value
                    }
                    result.textContent = `$${+e.target.value * +quantity.value}`
                    count = +e.target.value * +quantity.value
                }
            } else {
                inputDiscont.oninput = ev => {


                    console.log(checkbox.classList.contains('icons'));
                    if (ev.target.value.length === 1) {
                        count = +file.value * +quantity.value
                        const percent = count * ev.target.value / 100

                        count -= percent
                        result.textContent = `$${count.toFixed(2)}`
                        console.log(count)
                    } else if (ev.target.value.length === 2) {
                        count = +file.value * +quantity.value
                        const percent = count * ev.target.value / 100

                        count -= percent
                        result.textContent = `$${count.toFixed(2)}`
                    }

                    file.oninput = e => {
                        const percent = (+e.target.value * +quantity.value) * inputDiscont.value / 100
                        quantity.oninput = i => {
                            const percent = (+e.target.value * +i.target.value) * inputDiscont.value / 100
                            count = +e.target.value * +i.target.value - percent
                            result.textContent = `$${count.toFixed(2)}`
                        }
                        count = +e.target.value * +quantity.value - percent
                        result.textContent = `$${count.toFixed(2)}`

                        if (e.target.value === '') {
                            result.textContent = `$${+file.value * +quantity.value}`
                        }
                    }

                    quantity.oninput = e => {
                        const percent = (+e.target.value * +file.value) * inputDiscont.value / 100

                        file.oninput = i => {
                            const percent = (+e.target.value * +i.target.value) * inputDiscont.value / 100
                            count = +e.target.value * +i.target.value - percent
                            result.textContent = `$${count.toFixed(2)}`
                        }

                        count = +e.target.value * +file.value - percent
                        result.textContent = `$${count.toFixed(2)}`

                        if (e.target.value === '') {
                            result.textContent = `$${+file.value * +quantity.value}`
                        }
                    }
                }
            }
        }
    )
}

const setTextForm = (btn, product) => {

    const name = document.querySelectorAll('input[name="name"]')[1];
    const catalog = document.querySelectorAll('input[name="catalog"]')[1];
    const measurement = document.querySelectorAll('input[name="measurement"]')[1];
    const option = document.querySelectorAll('textarea')[1];
    const disont = document.querySelectorAll('.text-checkbox')[1]
    const quantity = document.querySelectorAll('input[name="quantity"]')[1];
    const price = document.querySelectorAll('input[name="price"]')[1];
    const isPrise = +product['price'] == product['price'].toString() ? +product['price']
        : +product['price'].slice(1);

    const inputDisabled = document.querySelectorAll('.text-checkbox')[1];
    const btnLabel = document.querySelectorAll('.container .one-five .checkbox+label')[1];
    const priceResult = document.querySelectorAll('.price_result')[1]

    if (product['discont'] !== undefined && product['discont'] !== '') {
        console.log(product['discont'])
        btnLabel.classList.add('icons');
        inputDisabled.removeAttribute('disabled');
        inputDisabled.setAttribute('required', '');
        const result = (product.quantity * isPrise) * product['discont'] / 100
        priceResult.textContent = `$${(product.quantity * isPrise - result).toFixed(2)}`
    } else {
        btnLabel.classList.remove('icons')
        inputDisabled.removeAttribute('required');
        inputDisabled.setAttribute('disabled', '');
        priceResult.textContent = `$${product.quantity * isPrise}`
    }

    name.value = product.name
    catalog.value = product['catalog']
    measurement.value = product['measurement']
    disont.value = product['discont']
    option.value = product['option']
    quantity.value = +product['quantity']
    price.value = isPrise
}

const createRow = ({id, name, catalog, measurement, discont, quantity, price, icon, result}) => {
    const tr = document.createElement('tr');
    const hidden = document.querySelector('input[type="hidden"]');
    tr.classList.add('contact');
    const isPrise = +price == price.toString() ? price : price.slice(1);
    const isDiscont = discont !== undefined
        ? ((isPrise * quantity) * discont / 100).toFixed(2)
        : 0;

    console.log(isDiscont)
    const tdID = document.createElement('td');
    hidden.setAttribute('value', `${Date.now()}`);
    tdID.textContent = id
    const tdName = document.createElement('td');
    tdName.textContent = name;
    const tdCatalog = document.createElement('td');
    tdCatalog.textContent = catalog;
    const tdMeasurement = document.createElement('td');
    tdMeasurement.textContent = measurement;
    const tdQuantity = document.createElement('td');
    tdQuantity.textContent = quantity;
    const tdPrice = document.createElement('td');
    tdPrice.textContent = '$' + isPrise
    const tdResult = document.createElement('td');
    result = `$${isPrise * quantity - isDiscont}`
    tdResult.classList.add('price')
    tdResult.textContent = result;

    const tdIcons = document.createElement('td');
    tdIcons.classList.add('icons');

    const iconPage = icon === true ? 'page' : 'none';

    const containerIcons = createContainer('navButton')
    containerIcons.insertAdjacentHTML('beforeend', `
        <button class="${iconPage}" ${iconPage === 'none' ? 'disabled' : ''}></button>
        <button class="edit"></button>
        <button class="del"></button>
    `)
    tdIcons.append(containerIcons)

    tr.append(tdID, tdName, tdCatalog, tdMeasurement, tdQuantity, tdPrice, tdResult, tdIcons);

    getResultPrice(data)
    return tr;
};

const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
    return allRow;
};

const renderPhoneBook = (app) => {
    const header = createHeader(getResultPrice(data));
    const main = createMain();
    const navGroup = createNavGroup([{
        className: 'filter', type: 'button', text: 'Фильтр',
    }, {
        className: 'search', type: 'button', text: '',
    }, {
        elem: 'input', className: 'search', type: 'search', text: 'Поиск по наименованию и категории',
    }, {
        className: 'append', type: 'button', text: 'Добавить товар',
    },]);

    const table = createTable();
    const footerTable = sectionTable()
    const {form, overlay} = createForm();
    const {formEdit, overlayEdit} = createFormEdit();
    const blockError = errorCard();
    const blockConnected = connectedCard();
    // const footer = createFooter();
    // header.headerContainer.append(logo);
    // main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);

    main.append(navGroup.btnWrapper, table, footerTable, overlay, overlayEdit);
    app.append(header, main);
    overlay.append(errorCard(), connectedCard())
    overlayEdit.append(blockError, blockConnected)
    console.log(blockError)


    return {
        list: table.tbody,
        btnFilter: navGroup.btns[0],
        btnSearch: navGroup.btns[2],
        btnAdd: navGroup.btns[3],
        formOverlay: overlay,
        overlayEdit,
        form,
        formEdit
    }
};

const addContactPage = (contact, list) => {
    list.append(createRow(contact));
};

module.exports = {
    getResultPrice,
    setResultPrice,
    addContactData,
    getPriceForm,
    setTextForm,
    renderContacts,
    createRow,
    renderPhoneBook,
    addContactPage
}