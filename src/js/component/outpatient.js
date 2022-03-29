var radioLst = document.querySelectorAll('#outpatient_popup .radio input'),
    inp = document.querySelector('input#other')?.parentElement.nextElementSibling.querySelector('input'),
    btnItems = document.querySelector('#outpatient_usage_popup')?.querySelectorAll('.content .btn');

if (radioLst) {
  radioLst.forEach(function (el) {
    el.addEventListener('change', toggleInp )
  })
}

if (btnItems) {
  btnItems.forEach(function (el) {
    el.addEventListener('click', toggleActive)
  })
}

function toggleInp () {
  if(this.checked && this.id == 'other') {
    inp.removeAttribute('disabled');
  } else {
    inp.setAttribute('disabled', '');
  }
}

function toggleActive () {
  var _this = this;
  btnItems.forEach(function (el) {
    if(el !=  _this) {
      el.classList.remove('is_active');
    }
  })
  this.classList.toggle('is_active');
}
