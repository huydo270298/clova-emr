var datalist = document.querySelectorAll('.datalist');
window.addEventListener('mousedown', function (event) {
  datalist.forEach(function (e) {
	if (event.target !== e.querySelector('.input') && event.target.closest('.datalist.open') === null) {
	  e.classList.remove('open');
	  e.querySelector('.datalist_option').dispatchEvent(new CustomEvent('close', { detail: { closeOther: document.querySelectorAll('.datalist.open').length > 0 } }))
	}
  })
})

var closeSelect = new CustomEvent('close');

datalist.forEach(function (e) {
  var selectBtn = e.querySelector('.input input');
  var selectOpt = e.querySelectorAll('.datalist_option li .option');
  selectBtn.addEventListener('focus', showOption);
  selectOpt.forEach(function (opt) {
	opt.addEventListener('click', setVal)
  })
});

function showOption(e) {
  scrollToView(this);
  this.closest('.datalist').classList.add('open');
  var option = this.closest('.datalist').querySelector('.datalist_option'),
	optionSpecs = option.getBoundingClientRect(),
	optionMaxH = parseInt(window.getComputedStyle(option).maxHeight);
  if (!this.closest('.datalist').classList.contains('open')) {
	option.dispatchEvent(closeSelect)
  } else {
	var cssParent = option.parentNode.getBoundingClientRect(),
	  optionContent = option.querySelector('.simplebar-content'),
	  optionHeight = optionContent.getBoundingClientRect().height >= optionMaxH ? optionMaxH : optionContent.getBoundingClientRect().height,
	  popupParent = option.closest('.popup'),
	  left = optionSpecs.left, top = optionSpecs.top;
	if (popupParent !== null && window.getComputedStyle(popupParent).position === 'fixed') {
	  left = left - popupParent.getBoundingClientRect().left;
	  top = top - popupParent.getBoundingClientRect().top;
	}
	option.style.position = 'fixed';
	if (left + optionSpecs.width >= window.innerWidth) {
	  option.style.right = (window.innerWidth - cssParent.left - cssParent.width) + 'px';
	  option.style.left = 'auto';
	} else {
	  option.style.left = left + 'px';
	  option.style.right = 'auto';
	}
	if (top + optionHeight >= window.innerHeight) {
	  option.style.bottom = (window.innerHeight - cssParent.top + 6) + 'px';
	  option.style.top = 'auto';
	} else {
	  option.style.top = top + 'px';
	  option.style.bottom = 'auto';
	}
	option.style.width = optionSpecs.width + 'px';
	option.style.height = optionHeight + 'px';
	option.style.margin = '0';
	if (option.closest('.row') !== null) option.closest('.row').style.zIndex = 2
	option.addEventListener('close', closeDatalist, { once: true });
	window.addEventListener('scroll', closeDatalist.bind(option), { once: true });
	if (document.querySelector('.wrap')) document.querySelector('.wrap').addEventListener('scroll', closeDatalist, { once: true });
  }
}

function closeDatalist(e) {
  if (!e.detail?.closeOther && this.closest('.row') !== null) this.closest('.row').style.zIndex = '';
  this.closest('.datalist').classList.remove('open');
  this.removeAttribute('style');
  if (document.querySelector('[prevent-scroll-event]') !== null) document.querySelector('[prevent-scroll-event]').removeAttribute('prevent-scroll-event')
}

function setVal() {
  var val = this.value,
	btn = this.closest('.datalist').querySelector('.input input'),
	option = this.closest('.datalist_option');
  btn.value = val;
  option.dispatchEvent(closeSelect);
}

function scrollToView(el) {
  var p = el.closest('.simplebar-content-wrapper') === null ? el.closest('.datalist') : el.closest('.simplebar-content-wrapper'),
	coord = el.getBoundingClientRect();
  if (isElementInView(el, p)) return false;
  p.setAttribute('prevent-scroll-event', '')
  p.scrollTo(coord.top, coord.left);
}

function isElementInView(el, viewport) {
  var elInset = {
	top: el.getBoundingClientRect().top - viewport.getBoundingClientRect().top + viewport.scrollTop,
	left: el.getBoundingClientRect().left - viewport.getBoundingClientRect().left + viewport.scrollLeft,
	right: el.getBoundingClientRect().left - viewport.getBoundingClientRect().left + viewport.scrollLeft + el.getBoundingClientRect().width,
	bottom: el.getBoundingClientRect().top - viewport.getBoundingClientRect().top + viewport.scrollLeft + el.getBoundingClientRect().height
  },
	viewportInset = {
	  top: viewport.scrollTop,
	  left: viewport.scrollLeft,
	  right: viewport.scrollLeft + viewport.offsetWidth,
	  bottom: viewport.scrollTop + viewport.offsetHeight
	};
  return (elInset.top >= viewportInset.top &&
	elInset.left >= viewportInset.left &&
	elInset.right <= viewportInset.right &&
	elInset.bottom <= viewportInset.bottom)
}
