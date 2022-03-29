var treatmentsItems = document.querySelectorAll('.treatments_lst .item'),
	inpName = document.querySelector('#next_frequently_popup .input input'),
	btnEdit = document.querySelector('#next_frequently_popup .btn:disabled');

if (treatmentsItems) {
  treatmentsItems.forEach(function (el) {
	if(el.classList.contains('is_edit')) {
	  el.addEventListener('click', showInp);
	  var btnDelete = el.querySelector('.btn_delete');
	  btnDelete?.addEventListener('click', hideItem);
	  el.addEventListener('click', addActive )
	} else {
	  el.addEventListener('contextmenu', rightClickSelect);
	}
  })
}

function rightClickSelect(e) {
  e.preventDefault();
}
function addActive () {
  treatmentsItems.forEach(function (el) {
	if (el.classList.contains('is_active')) {
	  el.classList.remove('is_active');
	}
  })
  this.classList.add('is_active');
}

function hideItem () {
  this.closest('.list').removeChild(this.closest('.item'));
}

function showInp () {
  var valBtn = this.querySelector('.btn').innerHTML;
  inpName.value = valBtn;
  btnEdit.removeAttribute('disabled');
}
