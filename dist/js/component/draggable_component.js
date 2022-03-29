var dragEl = document.querySelectorAll('.draggable_component li'),
  panels = null,
  panelCoord = [];

if (dragEl.length > 0) {
  dragEl.forEach(function (el) {
	el.addEventListener('mousedown', startDrag)
  })
}

function startDrag(e) {
  var elPos = this.getBoundingClientRect(),
	cursorPos = { top: e.clientY - elPos.top, left: e.clientX - elPos.left },
	elClone = this.cloneNode(true);
  this.classList.add('dragging');
  elClone.classList.add('cloned');
  elClone.style.top = elPos.top + 'px';
  elClone.style.left = elPos.left + 'px';
  var mousemoveHandler = dragging.bind(elClone, cursorPos)
  document.addEventListener('mouseup', stopDrag.bind(elClone, mousemoveHandler), { once: true });
  document.addEventListener('mousemove', mousemoveHandler);
  this.parentNode.append(elClone)
  getPanelsCoord();
}

function stopDrag(mousemoveHandler, e) {
  document.removeEventListener('mousemove', mousemoveHandler);
  this.remove();
  panelCoord = [];
  document.querySelector('.edit_mode .panel.over')?.classList.remove('over');
  document.querySelector('.draggable_component .dragging').classList.remove('dragging');
}

function dragging(cursorPos, e) {
  this.style.top = (e.clientY - cursorPos.top) + 'px';
  this.style.left = (e.clientX - cursorPos.left) + 'px';
  checkInside(e.clientX, e.clientY);
}

function getPanelsCoord() {
  panels = document.querySelectorAll('.edit_mode .panel');
  if (panels.length > 0) {
	panels.forEach(function (p, i) {
	  var c = p.getBoundingClientRect();
	  panelCoord[i] = { x0: c.left, x1: c.left + c.width, y0: c.top, y1: c.top + c.height }
	})
  }
}

function checkInside(x, y) {
  var draggingEl = document.querySelector('.draggable_component li.cloned'),
	draggingElSize = draggingEl.getAttribute('data-size');
  panelCoord.forEach(function (p, i) {
	if (x >= panelCoord[i].x0 && y >= panelCoord[i].y0 && x <= panelCoord[i].x1 && y <= panelCoord[i].y1) {
	  panels[i].classList.add('over');
	  // panels[i].append('<span class="overlay"></span>')
	  if (panels[i].getAttribute('data-size') !== draggingElSize) {
		draggingEl.classList.add('not_allowed');
	  } else {
		draggingEl.classList.remove('not_allowed');
	  }
	} else {
	  panels[i].classList.remove('over');
	  // panels[i].querySelector('.overlay')?.remove('over');
	}
  })
}
