var contSuggest = document.querySelector('[data-suggestinput]'),
	suggestItems = document.querySelectorAll('.suggest_area li');

if (contSuggest) {
  contSuggest.addEventListener('focus', function () {
	var rect = this.closest('.input').getBoundingClientRect(),
		suggestInput = this.parentElement.querySelector('.suggest_area');

	suggestInput.style.display = 'block';
	suggestInput.style.position = 'fixed';
	suggestInput.style.width = rect.width + 'px';

  });
  contSuggest.addEventListener('blur', hideSuggest);
}

if (suggestItems.length > 0) {
  suggestItems.forEach(function (el) {
	el.addEventListener('click',  function () {
	  this.closest('.input').querySelector('input').value = this.innerHTML;
	  this.closest('.suggest_area').style.display = 'none';
	})
  })
}

function hideSuggest() {
  document.addEventListener('click', ignoreSuggest);
}

function ignoreSuggest (e) {
  if (!e.target.closest('.suggest')) {
	document.querySelector('.suggest_area').style.display= "none";
  }
}
