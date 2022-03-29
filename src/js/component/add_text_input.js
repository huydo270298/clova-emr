var acts = document.querySelectorAll('.box_act .chkbox input'),
    fixtureItems = document.querySelectorAll('.fixture_list .item'),
    fileItems = document.querySelectorAll('.enlarged_file .item'),
    pointItems = document.querySelectorAll('.choose_length .item'),
    archWireItems = document.querySelectorAll('.archwire_lst .item'),
    inpArch = document.querySelectorAll('[data-archinp]');

if (acts.length > 0) {
  acts.forEach(function (el) {
    el.addEventListener('change', showTextChkboxToInp)
  })
}

if (fixtureItems.length > 0) {
  fixtureItems.forEach(function (el) {
    el.addEventListener ('click', function () {
      document.querySelector('.inp_fixture input').value = el.innerHTML;
    })
  })
}

if (fileItems.length > 0) {
  fileItems.forEach(function (el) {
    el.addEventListener ('click', function () {
      showTextToInp(el);
      document.querySelector('.inp_file input').value = el.innerHTML;
    })
  })
}

if (archWireItems.length > 0) {
  archWireItems.forEach(function (el) {
    el.addEventListener ('click', function () {
      var txt = this.innerHTML,
          currentCol = this.closest('.column').dataset.arch;

      if (inpArch.length > 0) {
        inpArch.forEach(function (el) {
          if (currentCol == el.dataset.archinp) {
            el.querySelector('.arch_wire_name').innerHTML = txt;
          }
        })
      }

    })
  })
}

if (pointItems.length > 0) {
  pointItems.forEach(function (el) {
    el.addEventListener ('click', function () {
      showTextToInp(el);
      document.querySelector('.inp_point input').value = el.innerHTML;
    })
  })
}

function showTextToInp (e) {
  var _this = e;
  e.closest('.content').querySelectorAll('.item').forEach(function (el) {
    if (el !=  _this) {
      el.classList.remove('is_active');
    }
  })
  e.classList.add('is_active');
}

function showTextChkboxToInp () {
  var valInp = [], allChecked = false;
  var inp = this.closest('.column').querySelector('.input input');

  this.closest('.list').querySelectorAll('.chkbox input').forEach(function (el) {
    if(el.checked) {
      allChecked = true;
      valInp.push(el.nextElementSibling.innerHTML);
      inp.value = valInp.join(',');
    }
    if (!allChecked) {
      inp.value = '';
    }
  })
}
