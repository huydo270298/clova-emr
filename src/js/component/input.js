var input = document.querySelectorAll('.input');

input.forEach(function (e) {
    var toggleShow = e.querySelector('.toggleShow');
    if (toggleShow !== null) {
        toggleShow.addEventListener('click', toggleShowHide);
    }
})

function toggleShowHide() {
    var stat = this.getAttribute('stat') === 'hide' ? 'show' : 'hide',
        input = this.closest('.input').querySelector('input'),
        type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    this.setAttribute('stat', stat);
    input.setAttribute('type', type);
}