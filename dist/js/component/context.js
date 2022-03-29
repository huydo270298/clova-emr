var contxt = document.querySelectorAll('[data-contextmenu]');

if (contxt.length > 0) {
  contxt.forEach(function (el) {
	el.addEventListener('contextmenu', openContext);
  })
}
function openContext(e) {
  e.preventDefault();
  e.stopPropagation();
  var pos = { x: e.clientX, y: e.clientY },
	threshold = 10,
	menu = this.getAttribute('data-contextmenu') !== '' ? this.closest('.js_context').querySelector('#' + this.getAttribute('data-contextmenu')) : this.closest('.js_context').querySelector('.dropdown.context_menu')
  panel = menu.closest('.panel[data-simplebar]')
  tooltips = document.querySelectorAll('.tooltips')
  text = this.querySelector('[data-contextname]')
  textEl = menu.querySelectorAll('.context_name');
  if (text !== null) {
	if (textEl !== null) {
	  textEl.forEach(function (el) {
		el.innerText = text.innerText;
	  })
	}
  }
  if (this.dataset.hasOwnProperty('tooltips')) {
	tooltips.forEach(function (el) {
	  el.style.display = 'none'
	})
  }
  if (menu !== null) {
	if (panel !== null) {
	  menu = menu.cloneNode(true);
	  panel.append(menu);
	}
	menu.classList.add('open');
	var menuOpt = menu.querySelector('.dropdown_option'),
	  w = menuOpt.getBoundingClientRect().width;
	new SimpleBar(menu.querySelector('.dropdown_option > ul'));
	menu.style.display = 'block';
	menu.style.position = 'fixed';
	menuOpt.style.width = w + 'px';
	menu.style.zIndex = 9999;
	if (menu.closest('.col') !== null) menu.closest('.col').style.zIndex = 4;
	menu.style.top = (pos.y + threshold) + 'px';
	menu.style.left = (pos.x + threshold) + 'px';
	menu.style.right = 'auto';
	var cssMenuOpt = menuOpt.getBoundingClientRect();
	if (cssMenuOpt.top + cssMenuOpt.height > window.innerHeight) {
	  menu.classList.add('p_top')
	}
	if (cssMenuOpt.left + cssMenuOpt.width > window.innerWidth) {
	  menu.classList.add('p_left')
	}
	if (menu.closest('.row') !== null) menu.closest('.row').style.zIndex = 2;
	if (menu.closest('.simplebar-wrapper') !== null) menu.closest('.simplebar-wrapper').style.zIndex = 3;
	menu.querySelector('.dropdown_option').addEventListener('close', closeContext, { once: true });
	document.addEventListener('mousedown', closeContext, { once: true });
	menu.addEventListener('mousedown', menuMouseDown, { once: true })
  }
}
function menuMouseDown(e) {
  e.stopPropagation();
}
function closeContext(e) {
  e.preventDefault();
  var menu = document.querySelectorAll('.dropdown.context_menu.open'),
	menuInPanel = document.querySelectorAll('.panel[data-simplebar] > .dropdown.context_menu.open');

  if (menu.length > 0) {
	menu.forEach(function (el) {
	  el.dispatchEvent(new CustomEvent('contextClose'));
	  if (el.closest('.row') !== null) el.closest('.row').style.zIndex = '';
	  if (el.closest('.simplebar-wrapper') !== null) el.closest('.simplebar-wrapper').style.zIndex = '';
	  el.classList.remove('open');
	  el.removeAttribute('style');
	  el.removeEventListener('mousedown', menuMouseDown)
	})
  }
  if (menuInPanel.length > 0) {
	menuInPanel.forEach(function (el) {
	  el.remove()
	})
  }
}
