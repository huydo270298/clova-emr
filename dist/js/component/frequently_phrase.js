var phrasePopup = document.querySelectorAll('#frequently_phrases');
phrasePopup.forEach(function (el) {
  var phrase = el.querySelectorAll('.autotext_box .textarea');
  var confirmBtn = el.querySelector('.confirm_btn');
  var scrollBox = el.querySelector('.scrolling_box')
  if (phrase.length > 0) {
	phrase.forEach(function (e) {
	  e.addEventListener('click', phraseClickHandler.bind(e, el, confirmBtn))
	})
  }
  scrollBox.addEventListener('scroll', addBoxShadow);
})
function phraseClickHandler() {
  var p = arguments[0],
	cfBtn = arguments[1];
  if (this.hasAttribute('selectable')) {
	this.classList.toggle('selected')
	cfBtn.toggleAttribute('disabled', p.querySelectorAll('.textarea.selected').length === 0)
  }
}
function addBoxShadow() {
  this.previousElementSibling.classList.toggle('show', this.scrollTop > 0);
}
