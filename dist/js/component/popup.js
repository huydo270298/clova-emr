var popupTriggers = document.querySelectorAll('[data-popup]'),
  popups = document.querySelectorAll('.popup'),
  openPopupEvent = new CustomEvent('popup.open'),
  closePopupEvent = new CustomEvent('popup.close');

if (popups.length > 0) {
  popups.forEach(function (popup) {
	if (popup.closest('.layer')?.classList.contains('show')) {
	  popup.closest('.layer')?.setAttribute('data-level', 1);
	  document.body.setAttribute('data-layer', 1);
	}
	popup.addEventListener('popup.open', openEventHandler)
	popup.addEventListener('popup.close', closeEventHandler)
  })
}

if (popupTriggers.length > 0) {
  popupTriggers.forEach(function (trigger) {
	trigger.addEventListener('click', openPopupHandler)
  })
}

function openPopupHandler(e) {
  e.preventDefault();
  var targerPopup = document.getElementById(this.getAttribute('data-popup'));
  if (targerPopup.closest('.layer').classList.contains('show')) return false;
  targerPopup.dispatchEvent(openPopupEvent);
}

function openEventHandler() {
  var level = document.body.hasAttribute('data-layer') ? parseInt(document.body.getAttribute('data-layer')) : 0;
  level++;
  document.body.setAttribute('data-layer', level);
  initDimmed.call(this, level);
  this.closest('.layer').classList.add('show');
  this.closest('.layer').setAttribute('data-level', level);
}

function closeEventHandler() {
  this.closest('.layer').classList.remove('show');
  var level = parseInt(this.closest('.layer').getAttribute('data-level'));
  document.body.setAttribute('data-layer', level - 1);
  this.closest('.layer').removeAttribute('data-level');
  this.closest('.layer').removeAttribute('style');
  // this.closest('.layer').querySelector('.dimmed').style = '';
}

function initDimmed(level) {
  var layerEl = this.closest('.layer'),
	dimmedEl = document.querySelector('.layer.dimmed');
  if (dimmedEl !== null) {
	dimmedEl.classList.remove('dimmed');
	if (level > 1) {
	  var prevLayer = document.querySelector('[data-level="' + (level - 1) + '"]');
	  var index = window.getComputedStyle(prevLayer).zIndex;
	  layerEl.style.zIndex = parseInt(index) + 1;
	  // var dimmedSpec = prevLayer.querySelector('.popup')?.getBoundingClientRect();
	  // dimmedEl.style.width = dimmedSpec.width + 'px';
	  // dimmedEl.style.height = dimmedSpec.height + 'px';
	  // dimmedEl.style.top = dimmedSpec.top + 'px';
	  // dimmedEl.style.left = dimmedSpec.left + 'px';
	}
  }
  layerEl.classList.add('dimmed');
}
