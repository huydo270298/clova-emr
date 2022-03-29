var categorizeListsTrigger = document.querySelectorAll('.categorized_list > li > a'),
	categoriItems = document.querySelectorAll('.categorized_list ul a'),
	templateItems = document.querySelectorAll('.template_box ul a');

if (categorizeListsTrigger.length > 0) {
  categorizeListsTrigger.forEach(function (a) {
	a.addEventListener('click', toggleExpand)
  })
}

if (categoriItems.length > 0) {
  categoriItems.forEach(function (el) {
	el.addEventListener('click', toggleSelectItem)
  })
}

if (templateItems.length > 0) {
  templateItems.forEach(function (el) {
	el.addEventListener('click', toggleSelectItem)
  })
}
function toggleExpand(e) {
  e.preventDefault()
  this.parentNode.classList.toggle('is_expanded')
}

function toggleSelectItem (e) {
  var _this = this;
  e.preventDefault();
  this.closest('ul').querySelectorAll('a')?.forEach(function (el) {
	el.parentNode.classList.remove('is_active');
	if(el == _this) {
	  el.parentNode.classList.add('is_active');
	}
  })
}
