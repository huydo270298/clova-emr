// Font size
var incFontBtn = document.querySelector('.inc_font_btn'),
  decFontBtn = document.querySelector('.dec_font_btn'),
  target = document.querySelectorAll(incFontBtn?.getAttribute('data-fs-target'));
if (target.length > 0) {
  target.forEach(function (t) {
	if (!t.hasAttribute('data-fs')) {
	  var fsz = parseInt(window.getComputedStyle(t).fontSize);
	  t.setAttribute('data-fs', fsz);
	}
  })
}
if (incFontBtn !== null) {
  incFontBtn.addEventListener('click', increaseFontsize)
}
if (decFontBtn !== null) {
  decFontBtn.addEventListener('click', decreaseFontsize)
}
function increaseFontsize() {
  var target = document.querySelectorAll(this.getAttribute('data-fs-target')),
	maxSize = parseInt(this.getAttribute('data-max-size'));
  if (target.length > 0) {
	target.forEach(function (t) {
	  var baseFs = parseInt(t.getAttribute('data-fs')),
		currentFs = parseFloat(window.getComputedStyle(t).fontSize);
	  if (currentFs < maxSize) {
		t.style.fontSize = (currentFs + (5 * (baseFs / 100))) + 'px';
	  } else {
		t.style.fontSize = maxSize + 'px'
	  }
	})
  }
}

function decreaseFontsize() {
  var target = document.querySelectorAll(this.getAttribute('data-fs-target')),
	minSize = parseInt(this.getAttribute('data-min-size'));
  if (target.length > 0) {
	target.forEach(function (t) {
	  var baseFs = parseInt(t.getAttribute('data-fs')),
		currentFs = parseFloat(window.getComputedStyle(t).fontSize);
	  if (currentFs > minSize) {
		t.style.fontSize = (currentFs - (5 * (baseFs / 100))) + 'px';
	  } else {
		t.style.fontSize = minSize + 'px'
	  }
	})
  }
}
