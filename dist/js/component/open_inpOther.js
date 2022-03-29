var btnActiveInps = document.querySelectorAll('[data-inpOther]:not(.input)');

if (btnActiveInps.length > 0) {
  btnActiveInps.forEach(function (el) {
	var rad = el.parentElement.querySelectorAll('input:not([type=text])');
	rad.forEach(function (el) {
	  el.addEventListener('change', function () {
		var inp = this.parentElement.parentElement.querySelector('.input[data-inpother] input'),
			sel = this.parentElement.parentElement.querySelector('.select[data-inpother] .select_btn');

		if (this.checked && this.parentElement.getAttribute('data-inpother') != null) {
		  if (inp != null) {
			inp.removeAttribute('disabled');
		  }
		  if (sel != null) {
			sel.removeAttribute('disabled');
		  }
		} else {
		  if (inp != null) {
			inp.setAttribute('disabled', '');
		  }
		  if (sel != null) {
			sel.setAttribute('disabled', '');
		  }
		}
	  })
	})
  })
}
