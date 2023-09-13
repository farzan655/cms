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
                    <a href="#">
                        <img src="./../img/Cross.svg" alt="">
                    </a>
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
                                        <input type="number" name="price" step="0.01" placeholder="цена" class="file">
                                    </div>
                                </div>
                                <div class="button_img">
                                    <label for="input__file" class="input__file-button">
                                        <span name="icon" class="input__file-button-text">Добавить изображение</span>
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

    // language=HTML
    formEdit.insertAdjacentHTML('beforeend', `
        <button class="close" type="button"></button>
        <form action="#">
            <div class="cross">
                <a href="#">
                    <img src="./../img/Cross.svg" alt="">
                </a>
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
                                    <span class="txt6"> Количество </span>
                                    <input type="number" name="quantity" class="quantity">
                                    <span class="txt7"> Цена </span>
                                    <input type="number" name="price" step="0.01" placeholder="цена" class="file">
                                </div>
                            </div>
                            <div class="button_img">
                                <label for="input__file" class="input__file-button">
                                    <span name="icon" class="input__file-button-text">Добавить изображение</span>
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

    // document.querySelector('input[name="name"]').value
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