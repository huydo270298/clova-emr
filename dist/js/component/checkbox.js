var checkbox = document.querySelectorAll('.chkbox');
if (checkbox.length > 0) {
  checkbox.forEach(function (cb) {
	var input = cb.querySelector('input');
	cb.setAttribute('data-check', input.checked)
	input.addEventListener('change', checkboxChange)
  })
}

function checkboxChange() {
  this.parentNode.setAttribute('data-check', this.checked);
  var name = this.getAttribute('data-checkall') === null ? this.getAttribute('name') : this.getAttribute('data-checkall'),
	checkAll = document.querySelector('input[data-checkall="' + name + '"]');
  if (name === null && checkAll === null) return false;
  if (this !== checkAll) {
	if (this.checked) {
	  if (Array.from(document.querySelectorAll('input[name="' + name + '"]')).some(function (c) {
		return c.checked === false;
	  })) {
		checkAll.checked = false;
	  } else {
		checkAll.checked = true;
	  }
	} else {
	  checkAll.checked = false;
	}
  } else {
	document.querySelectorAll('input[name="' + name + '"]').forEach(function (c) {
	  c.checked = checkAll.checked;
	})
  }
}

var checkboxInput = document.querySelectorAll('.chkbox[data-disable-input]');
if (checkboxInput.length > 0) {
  checkboxInput.forEach(function (cb) {
	cb.querySelector('input').addEventListener('change', toggleInputDisable)
  })
}
function toggleInputDisable() {
  var targetInput = document.getElementById(this.parentNode.getAttribute('data-disable-input'));
  targetInput.querySelector('input').disabled = !this.checked
}
