(function () {
    function r(e, n, t) {
        function o(i, f) {
            if (!n[i]) {
                if (!e[i]) {
                    var c = "function" == typeof require && require;
                    if (!f && c) return c(i, !0);
                    if (u) return u(i, !0);
                    var a = new Error("Cannot find module '" + i + "'");
                    throw a.code = "MODULE_NOT_FOUND", a
                }
                var p = n[i] = {exports: {}};
                e[i][0].call(p.exports, function (r) {
                    var n = e[i][1][r];
                    return o(n || r)
                }, p, p.exports, r, e, n, t)
            }
            return n[i].exports
        }

        for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
        return o
    }

    return r
})()({
    1: [function (require, module, exports) {
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
    }, {"./falidationInput.js": 4, "./renderCards.js": 5, "./servisStoreg.js": 6}],
    2: [function (require, module, exports) {
        const createContainer = (className = 'container') => {
            const container = document.createElement('div');
            container.classList.add(className);
            return container;
        };

        const createHeader = (price) => {
            const header = document.createElement('header')
            header.classList.add('header');
            header.insertAdjacentHTML("beforeend", `
        <h1 class="title">Cms</h1>
        <p class="result">Итоговая стоймость: <span class="price">$${price}</span></p>
    `)
            return header;
        }

        const createMain = () => {
            const main = document.createElement('main')
            main.classList.add('main');
            return main
        }

        const createNavGroup = (params) => {
            const btnWrapper = document.createElement('div');
            btnWrapper.classList.add('btn-wrapper');
            const left = createContainer('left')

            const btns = params.map(({elem = 'button', className, type, text}) => {
                const element = document.createElement(elem);

                if (element.type === 'text') {
                    element.type = type;
                    element.className = className;
                    element.setAttribute('placeholder', text)
                } else {
                    element.type = type;
                    element.className = className;
                    element.textContent = text;
                    if (element.className === 'search') {
                        element.setAttribute('tabindex', '-1')
                    }
                }

                return element;
            });

            left.append(...btns.slice(0, 3))
            btnWrapper.append(left, ...btns.slice(3));

            return {
                btnWrapper, btns,
            };
        }

        const createTable = () => {
            const table = document.createElement('table');
            table.classList.add('table');

            const thead = document.createElement('thead');
            thead.insertAdjacentHTML('beforeend', `
            <tr>
                <th>ID</th>
                <th>Наименование</th>
                <th>Категория</th> 
                <th>ед/изм</th>
                <th>количество</th>
                <th>цена</th>
                <th>ИТОГ</th>
                <th></th>
            </tr>   
        `);

            const tbody = document.createElement('tbody');
            table.append(thead, tbody);
            table.tbody = tbody;

            return table;
        };

        const createForm = () => {
            const overlay = document.createElement('div');
            overlay.classList.add('form-overlay');

            const form = document.createElement('form');
            form.classList.add('form');

            form.insertAdjacentHTML('beforeend', `
                <button class="close" type="button"></button>
                <form action="#">
                <div class="cross">
                    <a href="#"></a>
                </div>
                <div class="wrapper">
                    <div class="module">
                        <h1>Добавить товар</h1>
                        <div class="line"></div>
                    </div>
            
                    <section class="main">
                        <form action="#112">
                            <div class="container">
                                <div class="content">
                                    <div class="one-five">
                                        <input type="hidden" name="id" value="${Date.now()}">
                                        <span class="txt1"> Наименование </span>
                                        <input type="text" name="name">
                                        <span class="txt2"> Категория </span>
                                        <input type="text" name="catalog">
                                        <span class="txt3"> Единицы измерения </span>
                                        <input type="text" name="measurement">
                                        <span class="txt4"> Дисконт </span>
                                        <div class="connection">
                                            <input type="checkbox" checked class="checkbox" id="check_mark">
                                            <label tabindex="4" for="check_mark"></label>
                                            <input type="number" name="discont" class="text-checkbox" disabled>
                                        </div>
                                    </div>
                                    <div class="six-nine">
                                        <span class="txt5"> Описание </span>
                                        <!-- <input type="text" class="opisanie"> -->
                                        <textarea id="" cols="30" name="option" rows="10"></textarea>
                                        <span class="txt6" > Количество </span>
                                        <input type="number" name="quantity" class="quantity">
                                        <span class="txt7"> Цена </span>
                                        <input type="number" name="price" step="0.01" class="file">
                                    </div>
                                </div>
                                <div class="button_img">
                                    <input name="icon" type="file" id="input__file" class="input input__file">
                                    <label for="input__file" class="input__file-button">
                                        <span class="input__file-button-text">Добавить изображение</span>
            
                                    </label>
                                </div>
                            </div>
                            <div class="footer">
                                <div class="text">
                                    <p>Итоговая стоимость: <span class="price_result" name="result">$0</span></p>
                                </div>
                                <div class="button">
                                    <button type="submit"> Добавить товар </button>
                                </div>
                            </div>
                        </form>
                    </main>
                </div>
                `)

            overlay.append(form);

            return {
                form, overlay
            }
        };

        const createFormEdit = () => {
            const overlayEdit = document.createElement('div');
            overlayEdit.classList.add('form-overlay');

            const formEdit = document.createElement('form');
            formEdit.classList.add('form');

            formEdit.insertAdjacentHTML('beforeend', `
                <button class="close" type="button"></button>
                <form action="#">
                    <div class="cross">
                        <a href="#"></a>
                    </div>
                    <div class="wrapper">
                        <div class="module">
                            <h1>Изменить товар</h1>
                            <div class="line"></div>
                        </div>

                        <section class="main">
                            <form action="">
                                <div class="container">
                                    <div class="content">
                                        <div class="one-five">
                                            <span class="txt1"> Наименование </span>
                                            <input type="text" name="name">
                                            <span class="txt2"> Категория </span>
                                            <input type="text" name="catalog">
                                            <span class="txt3"> Единицы измерения </span>
                                            <input type="text" name="measurement">
                                            <span class="txt4"> Дисконт </span>
                                            <div class="connection">
                                                <input type="checkbox" checked class="checkbox" id="check_mark">
                                                <label tabindex="4" for="check_mark"></label>
                                                <input type="number" name="discont" class="text-checkbox" disabled>
                                            </div>
                                        </div>
                                        <div class="six-nine">
                                            <span class="txt5"> Описание </span>
                                            <!-- <input type="text" class="opisanie"> -->
                                            <textarea id="" cols="30" name="option" rows="10"></textarea>
                                            <span class="txt6"> Количество </span>
                                            <input type="number" name="quantity" class="quantity">
                                            <span class="txt7"> Цена </span>
                                            <input type="number" name="price" step="0.01"
                                                   class="file">
                                        </div>
                                    </div>
                                    <div class="button_img">
                                        <input name="file" type="file" id="input__file" class="input input__file">
                                        <label for="input__file" class="input__file-button">
                                        <span class="input__file-button-text">Добавить изображение</span>
            
                                        </label>
                                    </div>
                                </div>
                                <div class="footer">
                                    <div class="text">
                                        <p>Итоговая стоимость: <span class="price_result" name="result">$0</span></p>
                                    </div>
                                    <div class="button">
                                        <button type="submit"> Изменить товар</button>
                                    </div>
                                </div>
                            </form>
                            </main>
                    </div>
            `)

            overlayEdit.append(formEdit);


            return {
                formEdit, overlayEdit
            }
        };

        const errorCard = () => {
            const block = document.createElement('div');
            block.classList.add('block');

            const contener = document.createElement('div');
            contener.classList.add('contener');

            contener.insertAdjacentHTML('beforeend', `
        <div class="error_img"></div>
        <div class="text__result">
            <h1 class="text">Что-то пошло не так</h1>
        </div>
        <div class="close__card">
            <button class="cross__card"></button>
        </div>
    `)

            block.append(contener)

            return block
        }

        const connectedCard = () => {
            const block = document.createElement('div');
            block.classList.add('block__connected');

            const contener = document.createElement('div');
            contener.classList.add('contener');

            contener.insertAdjacentHTML('beforeend', `
        <div class="correctly_img"></div>
        <div class="text__result">
            <h1 class="text">Поля успешно заполненны</h1>
        </div>
        <div class="close__card">
            <button class="cross__card"></button>
        </div>
    `)

            block.append(contener)

            return block
        }

        const sectionTable = () => {
            const section = document.createElement('section');
            section.classList.add('nav')
            section.insertAdjacentHTML('beforeend', `
        <label for="number">Показывать на странице: </label>
        <select name="" id="number">
            <option value="five">1</option>
            <option value="ten">3</option>
            <option value="fifteen">5</option>
            <option value="twenty">10</option>
        </select>
        <p class="tracking"><span class="page">1</span> of <span class="pages">1</span></p>
        <button><</button>
        <button>></button>
    `)

            return section
        }

        module.exports = {
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
        }
    }, {}],
    3: [function (require, module, exports) {
        const getClick = (name, inputDisabled) => {
            return name.addEventListener('click', () => {
                name.classList.toggle('icons');

                if (name.classList.contains('icons')) {
                    inputDisabled.removeAttribute('disabled');
                    inputDisabled.setAttribute('required', '');
                    inputDisabled.value = 0;

                } else {
                    inputDisabled.setAttribute('disabled', '');
                    inputDisabled.removeAttribute('required');
                    inputDisabled.value = '';
                }

            });
        };

        module.exports = {
            getClick
        }
    }, {}],
    4: [function (require, module, exports) {
        const {
            getResultPrice,
            setResultPrice,
            addContactData,
            addContactPage
        } = require("./renderCards.js")

        const {
            data,
            editStorage,
        } = require("./servisStoreg.js")

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

        const checkInputText = (name, id = 0, count = 50, text = "Не больше 25 символов!") => {
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
    }, {"./renderCards.js": 5, "./servisStoreg.js": 6}],
    5: [function (require, module, exports) {
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
            tdIcons.classList.add('icons')

            const iconPage = JSON.stringify(icon) !== '{}' ? 'page' : 'none';

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
    }, {"./createElemets.js": 2, "./servisStoreg.js": 6}],
    6: [function (require, module, exports) {
        "use strict";

        const {
            setResultPrice,
        } = require("./renderCards.js")

        const {getResultPrice} = require("./renderCards.js");

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
    }, {"./renderCards.js": 5}],
    7: [function (require, module, exports) {
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
    }, {
        "../modules/control.js": 1,
        "../modules/disebleClick.js": 3,
        "../modules/renderCards.js": 5,
        "../modules/servisStoreg.js": 6
    }]
}, {}, [7]);
