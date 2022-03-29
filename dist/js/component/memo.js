var btnTab = document.querySelectorAll('.btn[data-tabid]'),
	btnAccess = document.querySelectorAll('.btn_access');

if(btnTab) {
  btnTab.forEach(function (el) {
	el.addEventListener('click', memoEvent);
  });
}
if(btnAccess) {
  btnAccess.forEach(function (el) {
	el.addEventListener('click', changePopup);
  })
}

function memoEvent() {
  var btnTabID = this.dataset.tabid;

  this.parentElement.querySelectorAll('.btn').forEach(function (el) {
	el.classList.remove('is_active');
  })
  this.classList.add('is_active');
  this.parentElement.nextElementSibling.querySelectorAll('.tab').forEach(function (el) {
	if (btnTabID == el.dataset.tabid) {
	  el.classList.add('is_active');
	} else {
	  el.classList.remove('is_active');
	}
  })
}

function changePopup() {
  this.closest('.layer').style.display = "none";
  this.closest('.layer').nextElementSibling.style.display = "block";
}
