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