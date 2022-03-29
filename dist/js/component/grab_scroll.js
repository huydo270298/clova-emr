var grabScrollEl = document.querySelectorAll('[data-grab-scroll]');

if (grabScrollEl.length > 0) {
  grabScrollEl.forEach(function (grabEl) {
	var ob = new IntersectionObserver(function (entries) {
	  entries.forEach(function (entry) {
		entry.target.setAttribute('data-visible', entry.isIntersecting)
	  })
	  grabEl.classList.toggle('scrollable', grabEl.querySelector('[data-visible="false"]') !== null);
	  grabEl.classList.toggle('scrollEnd', grabEl.querySelector('[data-visible="true"]:last-child') !== null);
	  grabEl.classList.toggle('scrollBegin', grabEl.querySelector('[data-visible="true"]:first-child') !== null);
	}, {
	  root: grabEl,
	  threshold: 0.99
	});
	grabEl.addEventListener('mousedown', startDragGrabEl)
	grabEl.children.forEach(function(child){
	  ob.observe(child)
	})
  })
}

function startDragGrabEl(e) {
  clearTimeout(window.delay);
  window.delay = setTimeout(function () {
	var filterEl = this;
	this.classList.add('grabbing');
	var startPoint = e.clientX,
	  scrollLeft = filterEl.scrollLeft;
	this.addEventListener('mousemove', drag);
	document.addEventListener('mouseup', stopDragGrabEl, { once: true });
	function drag(e) {
	  filterEl.scrollLeft = scrollLeft + (startPoint - e.clientX);
	}
	function stopDragGrabEl(e) {
	  clearTimeout(window.delay);
	  filterEl.classList.remove('grabbing')
	  filterEl.removeEventListener('mousemove', drag)
	}
  }.bind(this), 200)
}

document.addEventListener('mouseup', function () {
  clearTimeout(window.delay);
});
