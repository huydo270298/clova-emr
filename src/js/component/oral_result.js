var inpR = document.querySelectorAll('.classify_area input'),
    btnToothCorners = document.querySelectorAll('.box map area'),
    formInput = document.querySelectorAll('[data-forminput] input'),
    btnKey = document.querySelectorAll('.keyboard .btn'),
    inpFocus = null,
    ignoreKeyboard = document.querySelector('.keyboard');
    theme = document.querySelector('html[theme]').getAttribute('theme'),
    imgMissings = document.querySelectorAll('.box .image_area img');

  setInterval(function() {
    var currentTheme = document.querySelector('html[theme]').getAttribute('theme');

    if (currentTheme != theme) {
      if (imgMissings.length > 0) {
        imgMissings.forEach(function(el) {
          if(currentTheme == 'dark') {
            if (el.closest('td')?.classList.contains('tooth_molar')) {
              el.setAttribute('src','../img/components/measured/oral_state_molar_dark.png')
            } else {
              el.setAttribute('src','../img/components/measured/oral_state_incisor_dark.png')
            }
          } else {
            if (el.closest('td')?.classList.contains('tooth_molar')) {
              el.setAttribute('src','../img/components/measured/oral_state_molar.png')
            } else {
              el.setAttribute('src','../img/components/measured/oral_state_incisor.png')
            }
          }
        })
        theme = currentTheme;
      }
    }
  }, 10);

if(btnToothCorners.length > 0) {
  btnToothCorners.forEach(function (el) {
    el.addEventListener('click', addColor)
  })
}

if (formInput.length > 0 ) {
  formInput.forEach(function (el) {
    el.addEventListener('focus', showKeyboard);
    el.addEventListener('mousedown', addLayerBleeding);
    el.addEventListener('blur', hideKeyboard);
  })
}

if (btnKey.length > 0) {
  btnKey.forEach(function (el) {
    el.addEventListener('click', function (e) {
      if(inpFocus != null) {
        inpFocus.querySelector('input').setAttribute('value',this.value);
      }
      if (this.closest('.key_area').classList.contains('bleeding')) {
        inpFocus.querySelector('input').style.color = 'var(--t-red)';
      }
      this.closest('.form_input').style.display = "none";
    })
  })
}

function addColor () {
  var statusClassification = null,
      allCssClassification = '',
      color = '',
      txtClassification = '',
      alt = this.getAttribute("alt");
      btnClicks = this.closest('.image_area').nextElementSibling.querySelectorAll('.btn_click');
  inpR.forEach(function (el) {
    if (el.checked) {
      statusClassification = el.dataset.classification;
      color = el.dataset.color;
      txtClassification = el.nextElementSibling.innerHTML;
    }
  })
  if (statusClassification == "caries" || statusClassification == "charge" || statusClassification == "inlay") {
    btnClicks.forEach(function (el) {
      if (el.classList.contains(alt)) {
        el.dataset.classification = statusClassification;
      }
    })
  } else {
    if (statusClassification != null) {
      var imageArea = this.closest('.image_area');
      imageArea.innerHTML = txtClassification;
      imageArea.style.background = color;
    }
  }
}

function showKeyboard(e) {
  var rect = this.closest('td').getBoundingClientRect(),
      threshold = 6,
      indexTd = '',
      indexTr = '',
      keyboard = this.closest('.js_forminput').querySelector('.keyboard'),
      keyArea = keyboard.querySelectorAll('.key_area');

  inpFocus = this.closest('td');
  keyboard.style.position = 'fixed';
  keyboard.style.display = 'block';
  keyboard.style.zIndex = 9999;

  if (keyArea.length > 0) {
    keyArea.forEach(function (el) {
      if (el.dataset.keyboard == inpFocus.closest('tr').dataset.dentalcondition) {
        el.style.display = 'block';
      } else {
        el.style.display = 'none';
      }
    })
  }
  var tr = this.closest('tbody').querySelectorAll('tr');
  var td = this.closest('tr').querySelectorAll('td');
  if (tr.length>0) {
    tr.forEach(function (el, index) {
      if (el.contains(inpFocus)) {
        indexTr = index;
      }
    })
  }
  if (td.length>0) {
    td.forEach(function (el, index) {
      if (el == inpFocus) {
        indexTd = index;
      }
    })
  }
  if (indexTd < (td.length+1)/2) {
    keyboard.style.left = (rect.right + threshold) + 'px';
  } else {
    keyboard.style.left = (rect.left - threshold - keyboard.offsetWidth) + 'px';
  }
  if (indexTr < (tr.length+1)/2) {
    keyboard.style.top = rect.top + 'px';
  } else {
    keyboard.style.top = rect.bottom - keyboard.offsetHeight + 'px';
  }
  document.removeEventListener('click', ignoreClick);
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });
}

function addLayerBleeding (e) {
  if (e.button == 2 && this.closest('tr').dataset.dentalcondition == 'periodontal') {
    this.style.color = 'var(--t-red)';
  }
}

function hideKeyboard() {
  document.addEventListener('click', ignoreClick);
}

function ignoreClick (e) {
  if (!e.target.closest('.keyboard')) {
    ignoreKeyboard.style.display= "none";
  }
  document.querySelectorAll('[data-forminput] input').forEach(function (el) {
    var num = el.value;
    if(el.closest('tr').dataset.dentalcondition == 'periodontal' && el.value != '') {
      if (el.closest('html[theme]').getAttribute('theme') == 'light') {
        if (num >= 10) {
          el.style.background = 'rgba(92, 129, 255, 0.5)';
        } else if (num > 7) {
          el.style.background = 'rgba(92, 129, 255, 0.3)';
        } else if (num > 3) {
          el.style.background = 'rgba(92, 129, 255, 0.1)';
        }
      } else {
        if (num >= 10) {
          el.style.background = 'rgba(99, 126, 221, 0.55)';
        } else if (num > 7) {
          el.style.background = 'rgba(99, 126, 221, 0.35)';
        } else if (num > 3) {
          el.style.background = 'rgba(99, 126, 221, 0.15)';
        }
      }
    }
  })
}

function changeColor (num) {
  if (num >= 10) {

  } else if(num > 3) {

  }
}
