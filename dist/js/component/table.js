var table = document.querySelectorAll('.table');

if (table.length > 0) {
  table.forEach(function (t) {
	var tableEl = t.querySelector('table'),
	  tableElH = tableEl?.getBoundingClientRect().height,
	  tableH = t.getBoundingClientRect().height;
	if (tableElH < tableH) {
	  var fillTr = tableEl.querySelector('.fill'),
		fillTrH = fillTr?.getBoundingClientRect().height;
	  if (fillTr !== null) fillTr.querySelector('td').style.height = (tableH - tableElH + fillTrH) + 'px';
	}

	if (t.hasAttribute('data-row-select')) {
	  t.querySelectorAll('tbody tr').forEach(function (row) {
		row.addEventListener('click', function () {
		  if (!this.classList.contains('selected')) this.parentNode.querySelector('.selected')?.classList.remove('selected');
		  this.classList.toggle('selected');
		})
	  })
	}
  })
}

// reorder table

var reorderTables = document.querySelectorAll('.table[data-reorder]');

if (reorderTables.length > 0) {
  reorderTables.forEach(function (table) {
	var tr = table.querySelectorAll('tbody tr');
	tr.forEach(function (row) {
	  row.addEventListener('mousedown', startDragTableRowEl)
	})
  });

  function startDragTableRowEl(e) {
	var elPos = this.getBoundingClientRect(),
	  mousePos = {
		top: e.clientY - elPos.top,
		left: e.clientX - elPos.left
	  },
	  elClone = this.cloneNode(true);
	elClone.classList.add('cloned');
	elClone.style.top = elPos.top + 'px';
	elClone.style.left = elPos.left + 'px';
	this.parentNode.classList.add('has_drag');
	this.parentNode.append(elClone);
	this.classList.add('is_ondrag');
	var mousemoveHandler = draggingTableItem.bind(elClone, mousePos)
	document.addEventListener('mousemove', mousemoveHandler);
	document.addEventListener('mouseup', stopAndDropTableRowItem.bind(elClone, mousemoveHandler), { once: true });
  }
  function stopAndDropTableRowItem(mousemoveHandler, e) {
	document.removeEventListener('mousemove', mousemoveHandler);
	var movedEl = this.parentNode.querySelector('.is_ondrag'),
	  placeholder = this.parentNode.querySelector('.placeholder');
	if (placeholder !== null) {
	  placeholder.insertAdjacentElement('beforebegin', movedEl);
	  placeholder.remove();
	  trItems = movedEl.parentNode.querySelectorAll('tr').forEach(function (el, index) {
		el.querySelector('td').innerHTML = index + 1;
	  })
	}
	this.parentNode.classList.remove('has_drag');
	movedEl.classList.remove('is_ondrag');
	movedEl.parentNode.querySelectorAll('tr').forEach(function (tr) {
	  tr.removeEventListener('mouseover', tableRowOver);
	  tr.removeEventListener('mousemove', positioningTrPlaceholder);
	})
	this.remove();

  }
  function draggingTableItem(mousePos, e) {
	this.style.top = (e.clientY - mousePos.top) + 'px';
	this.style.left = (e.clientX - mousePos.left) + 'px';
	reOrderTableItemPos.call(this.parentNode.querySelector('.is_ondrag'));
  }
  function reOrderTableItemPos() {
	var siblingEls = this.parentNode.querySelectorAll('tr:not(.cloned)');
	if (siblingEls.length > 0) {
	  siblingEls.forEach(function (row) {
		row.addEventListener('mouseover', tableRowOver, { once: true })
	  })
	}
  }
  function tableRowOver() {
	var placeholder = this.parentNode.querySelector('.placeholder');
	if (placeholder === null) {
	  placeholder = document.createElement('SPAN');
	  placeholder.classList.add('placeholder');
	}
	if (!this.classList.contains('is_ondrag')) {
	  this.parentNode.append(placeholder);
	  this.addEventListener('mousemove', positioningTrPlaceholder);
	} else {
	  placeholder.remove();
	}
  }
  function positioningTrPlaceholder(e) {
	var rowPos = this.getBoundingClientRect()
	mouseTopPos = e.clientY - rowPos.top,
	  placeholder = this.parentNode.querySelector('.placeholder'),
	  tbodyTop = this.parentNode.getBoundingClientRect().top;
	if (placeholder === null) {
	  placeholder = document.createElement('SPAN');
	  placeholder.classList.add('placeholder');
	}
	if (mouseTopPos >= (rowPos.height / 2)) {
	  // Below
	  if (!this.nextElementSibling?.classList.contains('is_ondrag')) {
		this.insertAdjacentElement('afterend', placeholder);
		placeholder.style.top = (rowPos.top - tbodyTop + rowPos.height - 1) + 'px';
	  } else {
		placeholder.remove();
	  }
	} else {
	  // Above
	  if (!this.previousElementSibling?.classList.contains('is_ondrag')) {
		this.insertAdjacentElement('beforebegin', placeholder);
		placeholder.style.top = (rowPos.top - tbodyTop - 1) + 'px';
	  } else {
		placeholder.remove();
	  }
	}
  }
}
