var foldingBtn = document.querySelectorAll('.folding_btn');
if (foldingBtn.length > 0) {
  foldingBtn.forEach(function (el) {
	el.addEventListener('click', toggleFolding);
	el.addEventListener('mouseenter', checkHoverTooltips)
  })
}

function toggleFolding() {
  var col = this.closest('.col');
  if (col !== null) {
	var fn = this.getAttribute('data-function') === 'reduce' ? 'expand' : 'reduce',
	  reduced = col.parentNode.querySelectorAll('.reduced');
	this.setAttribute('data-function', fn);
	if (reduced.length > 1 && !col.classList.contains('reduced')) {
	  reduced.forEach(function (el) {
		el.classList.remove('reduced');
	  })
	}
	col.classList.toggle('reduced');
  }
}

function checkHoverTooltips() {
  var tooltip = this.querySelector('.tooltips');
  if (tooltip !== null) {
	var spec = tooltip.getBoundingClientRect();
	if (spec.left + spec.width > window.innerWidth) {
	  tooltip.style.left = 'auto';
	  tooltip.style.right = '-8px';
	}
  }
}
