var btnPopup = document.querySelectorAll('[data-popup]')
	popup = document.querySelectorAll('.popup'),
	tr = document.querySelectorAll('#diagnosis_content tbody tr');

if(btnPopup.length) {
	btnPopup.forEach(function (el) {
	  if(el.dataset.popup == 'cc_setting') {
		el.addEventListener('click', showPopup);
	  };
		el.addEventListener('dblclick', showPopup);
	})
}

tr.forEach(function (el) {
  el.addEventListener('dblclick', openTab)
})

function showPopup() {
	var popupId = this.dataset.popup;

	popup.forEach(function (el) {
		if(el.id == popupId) {
			el.closest('.layer').style.display = 'block';
		} else {
			el.closest('.layer').style.display = 'none';
		}
	})
}

function openTab() {
	window.open(this.dataset.href);
}
