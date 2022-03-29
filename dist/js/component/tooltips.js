var tooltips = document.querySelectorAll('[data-tooltips]');

if (tooltips.length > 0) {
	tooltips.forEach(function (el) {
		el.addEventListener('mouseenter', showTooltips);
		el.addEventListener('mouseleave', hideTooltips)
	})
}

function showTooltips() {
	var tooltipEl = this.querySelector('.tooltips');
	if(tooltipEl!==null){
		this.addEventListener('mousemove', movingTooltips)
		tooltipEl.style.display = 'block'
	}
}

function hideTooltips() {
	var tooltipEl = this.querySelector('.tooltips');
	if(tooltipEl!==null){
		this.removeEventListener('mousemove', movingTooltips)
		tooltipEl.style.display = 'none'
	}
}

function movingTooltips(e) {
	var pos = { x: e.clientX, y: e.clientY },
		threshold = 15,
		tooltipEl = this.querySelector('.tooltips'),
		tooltipElSpec = tooltipEl.getBoundingClientRect(),
		newPos = { x: pos.x + threshold, y: pos.y + threshold };
	if (newPos.x + tooltipElSpec.width >= window.innerWidth) {
		tooltipEl.style.right = (window.innerWidth - pos.x + threshold) + 'px';
		tooltipEl.style.left = 'auto';
	} else {
		tooltipEl.style.left = newPos.x + 'px';
		tooltipEl.style.right = 'auto'
	}

	if (newPos.y + tooltipElSpec.height >= window.innerHeight) {
		tooltipEl.style.bottom = (window.innerHeight - pos.y + threshold) + 'px';
		tooltipEl.style.top = 'auto';
	} else {
		tooltipEl.style.top = newPos.y + 'px';
		tooltipEl.style.bottom = 'auto'
	}
}
