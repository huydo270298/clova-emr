var btnExtend = document.querySelectorAll('[data-extend]'),
  control = document.querySelectorAll('.menu_control'),
  btnSelectTab = document.querySelectorAll('.btn_tab'),
  scrollWrap = document.querySelector('.treemenu .simplebar-content-wrapper'),
  tabIntro = document.querySelectorAll('.tab_btn'),
  treeMenu = document.querySelectorAll('.treemenu');

if (btnExtend.length) {
  btnExtend.forEach(function (el) {
	el.addEventListener('click', extend)
  })
}
if (control.length) {
  control.forEach(function (el) {
	el.addEventListener('mouseenter', function () {
	  let hoverEl = document.createElement('span'),
		tabLeft = document.querySelector('.treemenu');

	  if (this.closest('.treemenu').querySelector('.is_hover')) {
		this.closest('.treemenu').querySelector('.is_hover').classList.remove('is_hover')
	  }
	  this.classList.add('is_hover');
	  let top = this.closest('.treemenu').querySelector('.is_hover').getBoundingClientRect().top;
	  hoverEl.classList.add('layer_hover');
	  hoverEl.style.top = (top - tabLeft.getBoundingClientRect().top) + 'px';
	  if (tabLeft) {
		tabLeft.append(hoverEl);
		this.addEventListener('mouseleave', function () {
		  this.closest('.treemenu').querySelector('.layer_hover').remove()
		}, { once: true })
	  }
	})
  })
}
if (btnSelectTab.length) {
  btnSelectTab.forEach(function (el) {
	el.addEventListener('mouseup', function (e) {
	  e.preventDefault()
	  this.closest('.treemenu').querySelector('.is_active').classList.remove('is_active');
	  this.classList.add('is_active');
	  var layer = this.closest('.treemenu').querySelector('.layer_click');
	  layer.style.top = (this.getBoundingClientRect().top - this.closest('.treemenu').getBoundingClientRect().top) + 'px';
	})
  })
}
if (tabIntro.length > 0) {
  tabIntro.forEach(function (el) {
	el.addEventListener('click', function () {
	  var tab = document.querySelector(this.hash),
		treeMenu = tab?.querySelector('.treemenu');
	  if (treeMenu) {
		createLayer(treeMenu)
	  }

	})
  })
}
if (treeMenu.length > 0) {
  treeMenu.forEach(function (el) {
	if ((el.closest('.tab') !== null && el.closest('.tab').classList.contains('is_active')) || (el.closest('.tab') === null && el.querySelector('.layer_click') === null))
	  createLayer(el)

	if (el.hasAttribute('data-drag-order')) {
	  var dragLi = el.querySelectorAll('.simplebar-content > li > .menu_list > li > .menu_list > li');
	  dragLi.forEach(function (li) {
		li.addEventListener('mousedown', startLiDrag);
	  })
	}
  })
}
function startLiDrag(e) {
  e.preventDefault();
  var liPos = this.getBoundingClientRect(),
	treeMenuSpec = this.closest('.treemenu').getBoundingClientRect(),
	mousePos = {
	  top: e.clientY - liPos.top,
	  left: e.clientX - treeMenuSpec.left
	},
	elClone = this.cloneNode(true);
  elClone.classList.add('cloned');
  elClone.style.top = liPos.top + 'px';
  elClone.style.left = treeMenuSpec.left + 'px';
  elClone.style.width = treeMenuSpec.width + 'px';
  this.closest('.simplebar-content').append(elClone);
  this.classList.add('is_ondrag');
  document.documentElement.style.cursor = 'grabbing';
  var mousemoveHandler = draggingTreemenuItem.bind(elClone, mousePos);
  document.addEventListener('mousemove', mousemoveHandler);
  document.addEventListener('mouseup', stopAndDropTreemenuItem.bind(elClone, mousemoveHandler), { once: true });
}
function draggingTreemenuItem(mousePos, e) {
  this.style.top = (e.clientY - mousePos.top) + 'px';
  this.style.left = (e.clientX - mousePos.left) + 'px';
  reOrderTreeMenuPos.call(this.parentNode.querySelector('.is_ondrag'));
}
function reOrderTreeMenuPos() {
  var siblingEls = this.closest('.treemenu').querySelectorAll('.simplebar-content > li > .menu_list > li > .menu_list > li');
  if (siblingEls.length > 0) {
	siblingEls.forEach(function (row) {
	  row.addEventListener('mouseover', siblingOver, { once: true })
	})
  }
}
function stopAndDropTreemenuItem(mousemoveHandler, e) {
  document.removeEventListener('mousemove', mousemoveHandler);
  var movedEl = this.parentNode.querySelector('.is_ondrag'),
	placeholder = this.parentNode.querySelector('.placeholder');
  if (placeholder !== null) {
	placeholder.insertAdjacentElement('beforebegin', movedEl);
	placeholder.remove();
  }
  document.documentElement.style.cursor = '';
  movedEl.classList.remove('is_ondrag');
  movedEl.closest('.treemenu').querySelectorAll('.simplebar-content > li > .menu_list > li > .menu_list > li').forEach(function (li) {
	li.removeEventListener('mouseover', siblingOver);
	li.removeEventListener('mousemove', positioningPlaceholder);
	li.removeEventListener('mouseleave', removePlaceholder);
  })
  this.remove();

}
function siblingOver() {
  var placeholder = this.parentNode.querySelector('.placeholder');
  if (placeholder === null) {
	placeholder = document.createElement('SPAN');
	placeholder.classList.add('placeholder');
  }
  if (!this.classList.contains('is_ondrag')) {
	this.parentNode.append(placeholder);
	this.addEventListener('mousemove', positioningPlaceholder);
	this.addEventListener('mouseleave', removePlaceholder, { once: true });
  } else {
	placeholder.remove();
  }
}
function removePlaceholder() {
  this.closest('.treemenu').querySelector('.placeholder').remove();
}
function positioningPlaceholder(e) {
  var liPos = this.getBoundingClientRect()
  mouseTopPos = e.clientY - liPos.top,
	placeholder = this.parentNode.querySelector('.placeholder'),
	ulTop = this.closest('.simplebar-content').getBoundingClientRect().top;
  if (placeholder === null) {
	placeholder = document.createElement('SPAN');
	placeholder.classList.add('placeholder');
  }
  if (mouseTopPos >= (liPos.height / 2)) {
	// Below
	if (!this.nextElementSibling?.classList.contains('is_ondrag')) {
	  this.insertAdjacentElement('afterend', placeholder);
	  placeholder.style.top = (liPos.top - ulTop + liPos.height - 1) + 'px';
	} else {
	  placeholder.remove();
	}
  } else {
	// Above
	if (!this.previousElementSibling?.classList.contains('is_ondrag')) {
	  this.insertAdjacentElement('beforebegin', placeholder);
	  placeholder.style.top = (liPos.top - ulTop - 1) + 'px';
	} else {
	  placeholder.remove();
	}
  }
}

if (scrollWrap) {
  scrollWrap.addEventListener('scroll', function () {
	let top = this.querySelector('.is_hover').getBoundingClientRect().top,
	  topClick = this.querySelector('.is_active').getBoundingClientRect().top;
	if (document.querySelector('.layer_hover') !== null) {
	  document.querySelector('.layer_hover').style.top = (top - document.querySelector('.treemenu').getBoundingClientRect().top) + 'px'
	}
	if (document.querySelector('.layer_click') !== null) {
	  document.querySelector('.layer_click').style.top = (topClick - document.querySelector('.treemenu').getBoundingClientRect().top) + 'px'
	}
  })
}
function extend() {
  let menu = this.closest('li').querySelector('[data-menuextend]')
  layerClick = this.parentElement.nextElementSibling?.querySelector('.is_active')
  extendClass = this.closest('li').classList.contains('is_extend');
  if (menu !== null) {
	if (!extendClass) {
	  this.closest('li').classList.add('is_extend');
	  this.closest('.treemenu').querySelector('.layer_click').style.visibility = 'visible';
	} else {
	  this.closest('li').classList.remove('is_extend')
	  this.closest('.treemenu').querySelector('.layer_click').style.visibility = 'hidden';
	}
  }
}
function createLayer(treeMenu) {
  let selectEl = document.createElement('span'),
	top = treeMenu.getBoundingClientRect().top,
	activeClass = treeMenu.querySelector('.is_active');

  selectEl.classList.add('layer_click');
  if (activeClass) {
	selectEl.style.top = (activeClass.getBoundingClientRect().top - top) + 'px';
	treeMenu.append(selectEl);
  }
}
