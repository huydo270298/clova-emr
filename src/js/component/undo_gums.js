var tooth = document.querySelectorAll('.tooth_select');
var btnAdd = document.querySelectorAll(".gums");
var btnUndo = document.querySelectorAll(".btn_back");
var btnClear = document.querySelectorAll(".btn_clear");
var arrHistoryMove = {};

if (tooth.length > 0) {
  tooth.forEach(function (el) {
    arrHistoryMove[el.id] = [];
  })
}

if (btnClear.length > 0) {
  btnClear.forEach(function (el) {
    el.addEventListener('click', clearChecked)
  })
}

function showUndoStep (stepLast) {
  var gums = stepLast.element.closest('.tooth_select').querySelectorAll('.gums');
  var interdental = stepLast.element.closest('.tooth_select').querySelector('.top_info .is_active[data-interdental]').getAttribute('data-interdental');
  var arrHistoryItem = arrHistoryMove[stepLast.element.closest('.tooth_select').id],
      arrLoop = creatArrLoop(arrHistoryItem),
      arrScrew = creatArrScrew(arrHistoryItem),
      arr;
  if(interdental == 'loop') {
    arr = arrScrew;
  } else {
    arr = arrLoop
  }

  gums.forEach(function(el) {
    var inp = el.querySelector('input');

    if (inp == stepLast.element) {
      if (stepLast.element.nextElementSibling.getAttribute('class') == '' || stepLast.element.nextElementSibling.getAttribute('class') == interdental) {
        if (stepLast.checked) {
          inp.nextElementSibling.classList.remove(stepLast.interdental)
          if(arr.length > 0) {
            inp.checked = false;
            for (var i=arr.length; i>0; i--) {
              if (stepLast.element == arr[i-1].element) {
                inp.checked = true;
                inp.nextElementSibling.classList.add(arr[i-1].interdental);
                inp.nextElementSibling.classList.remove(stepLast.interdental)
                break;
              }
            }
          } else {
            inp.checked = false;
          }
        } else {
          inp.checked = true;
          inp.nextElementSibling.classList.add(stepLast.interdental)
        }
      }
    }
  })
}

btnAdd.forEach(function (el) {
  el.querySelector('input').addEventListener('change', function() {
    var arrHistoryItem = arrHistoryMove[el.closest('.tooth_select').id];
    arrHistoryItem.push({
      element: this,
      interdental: this.closest('.tooth_select').querySelector('.top_info .is_active[data-interdental]').getAttribute('data-interdental'),
      checked: this.checked
    })
  })
})

if (btnUndo.length > 0) {
  btnUndo.forEach(function (el) {
    el.addEventListener('click', undo)
  })
}

function creatArrLoop(arrLoop) {
  arrLoop = arrLoop.filter(function (item) {
    return item.interdental == 'loop'
  })
  return arrLoop
}

function creatArrScrew(arrScrew) {
  arrScrew = arrScrew.filter(function (item) {
    return item.interdental == 'screw'
  })
  return arrScrew
}

function undo() {
  var stepLast,
      arrHistoryItem = arrHistoryMove[this.closest('.tooth_select').id],
      arrLoop = creatArrLoop(arrHistoryItem),
      arrScrew = creatArrScrew(arrHistoryItem),
      interdental = this.closest('.tooth_select').querySelector('.top_info .is_active[data-interdental]').getAttribute('data-interdental');

  if(interdental == 'loop') {
    stepLast = arrLoop.pop();
    if (stepLast) {
      showUndoStep(stepLast);
    }
  } else if (interdental == 'screw') {
    stepLast = arrScrew.pop();
    if (stepLast) {
      showUndoStep(stepLast);
    }
  }
  arrHistoryMove[this.closest('.tooth_select').id] = arrHistoryItem.filter(function (item) {
    return item != stepLast;
  })
}

function clearChecked() {
  var btnGums = this.closest('.tooth_select').querySelectorAll('.gums');
  var interdental = this.closest('.tooth_select').querySelector('.top_info .is_active[data-interdental]').getAttribute('data-interdental');
  var arrHistoryItem = arrHistoryMove[this.closest('.tooth_select').id],
      arr;

  arrHistoryMove[this.closest('.tooth_select').id] = arrHistoryItem.filter(function (item) {
    return item.interdental != interdental;
  })

  var arrLoop = creatArrLoop(arrHistoryItem),
      arrScrew = creatArrScrew(arrHistoryItem);

  if(interdental == 'loop') {
    arr = arrScrew
  } else {
    arr = arrLoop
  }
  if (btnGums.length > 0) {
    btnGums.forEach(function(el) {
      var inp = el.querySelector('input');
      if (interdental == inp.nextElementSibling.getAttribute('class')) {
        if (arr.length > 0) {
          inp.checked = false;
          inp.nextElementSibling.setAttribute('class', '')
          for (var i=arr.length; i>0; i--) {
            if (inp == arr[i-1].element) {
              inp.checked = true;
              inp.nextElementSibling.classList.add(arr[i-1].interdental);
            }
          }
        } else {
          inp.checked = false;
          inp.nextElementSibling.setAttribute('class', '');
        }
      }
    })
  }

}
