var patient_list = document.querySelector('.main_nav .patient_nav_box .patient_lst>ul'),
  patient_item = patient_list?.querySelectorAll('li'),
  contextMenu = document.querySelector('.main_nav .patient_nav_box .patient_lst .dropdown_option');


patient_list?.addEventListener('scroll', function () {
  patient_item.forEach(function (e) {
	e.querySelector('a').classList.remove('is_active')
  })
  contextMenu.parentNode.classList.remove('open');
})

if (patient_item?.length > 0) {
  window.addEventListener('click', function (event) {
	patient_item.forEach(function (e) {
	  if (event.target.closest('li') !== e) {
		e.querySelector('a').classList.remove('is_active')
		contextMenu.parentNode.classList.remove('open');
	  }
	})
  })
  patient_item.forEach(function (el) {
	var dropdownBtn = el.querySelector('.dropdown_btn');
	dropdownBtn.addEventListener('contextmenu', openPatientContext);
  })
}

function openPatientContext(e) {
  e.preventDefault();
  var top = this.closest('li').getBoundingClientRect().top - this.closest('.patient_lst').getBoundingClientRect().top + 17;
  this.closest('ul').querySelectorAll('a').forEach(function (e) {
	e.classList.remove('is_active')
  })
  this.classList.add('is_active');
  contextMenu.parentNode.classList.add('open');
  var w = contextMenu.querySelector(':scope > ul').getBoundingClientRect().width;
  new SimpleBar(contextMenu.querySelector(':scope > ul'));
  contextMenu.style.top = top + 'px';
  contextMenu.style.width = w + 'px';
}
