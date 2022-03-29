var swiperMenu = new Swiper(".nav", {
  slidesPerView: 'auto',
  spaceBetween: 4,
  observer: true,
  observeParents: true,
  freeMode: true,
});

"use strict";

window.addEventListener('resize', updateNav)
window.addEventListener('load', updateNav)

function updateNav() {
  var nav = document.querySelector('.nav'),
	patientBox = document.querySelector('.patient_nav_box'),
	w = window.innerWidth - patientBox?.getBoundingClientRect().width;

  if (!isNaN(w) && nav !== null) {
	nav.style.width = w + 'px';
  }
  if (window.innerWidth > 768) {
	navMenuDropdown = document.querySelectorAll('.nav .dropdown');

	if (navMenuDropdown.length > 0) {
	  navMenuDropdown.forEach(function (el) {
		var dropdownBtn = el.querySelector('.dropdown_btn');
		dropdownBtn.addEventListener('contextmenu', cloneDropdown)
	  })
	}
  }
}


function cloneDropdown() {
  var options = this.parentNode.querySelector('.dropdown_option'),
	cloned = options.cloneNode(true),
	mainNav = document.querySelector('.main_nav'),
	css = options.getBoundingClientRect();
  options.addEventListener('close', function () {
	cloned.remove();
  })
  cloned.style.position = 'fixed';
  cloned.style.top = css.top + 'px';
  cloned.style.left = css.left + 'px';
  cloned.style.width = css.width + 'px';
  cloned.style.height = css.height + 'px';
  cloned.style.display = 'block';
  mainNav.append(cloned);
}
