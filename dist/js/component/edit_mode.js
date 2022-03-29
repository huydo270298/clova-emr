window.addEventListener('resize', function () {
  if (window.innerWidth <= 1440) {
	disableEditMode();
  }
})
function disableEditMode() {
  if (document.querySelector('.main_layout')?.classList.contains('edit_mode')) {
	toggleEditMode()
  }
}
function toggleEditMode() {
  var panels = document.querySelectorAll('.panel'),
	mainLayout = document.querySelector('.main_layout'),
	initWidth = [798, 1074];
  mainLayout.classList.toggle('edit_mode');
  document.querySelectorAll('.main_layout > .row').forEach(function (el) {
	var col = el.querySelectorAll(':scope > .col');
	col[0].style.width = initWidth[0] + 'px';
	col[1].style.width = initWidth[1] + 'px';
  })
  panels.forEach(function (el) {
	if (mainLayout.classList.contains('edit_mode')) {
	  var editWrap = document.createElement('div');
	  editWrap.classList.add('panel_edit');
	  el.append(editWrap);
	} else {
	  var editWrap = el.querySelector('.panel_edit');
	  editWrap.remove();
	}
  });
}
