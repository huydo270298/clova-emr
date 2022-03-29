var bool = false,
  active_fn = null,
  tooth = document.querySelectorAll('.tooth_select'),
  btnExpression = document.querySelectorAll('[data-expression]'),
  btnImplant = document.querySelectorAll('.btn_implant'),
  btnPontic = document.querySelectorAll('.btn_pontic'),
  btnSelectTopToothHall = document.querySelectorAll('[data-selecttop]'),
  btnSelectAllToothHall = document.querySelectorAll('[data-selectall]'),
  btnSelectBottomToothHall = document.querySelectorAll('[data-selectbottom]'),
  btnSelectTopChild = document.querySelectorAll('[data-selecttop-child]'),
  btnSelectAllChild = document.querySelectorAll('[data-selectall-child]'),
  btnSelectBottomChild = document.querySelectorAll('[data-selectbottom-child]'),
  btnTooth = document.querySelectorAll('.tooth'),
  toothMap = document.querySelectorAll('[data-toothmap]'),
  btnComplete = document.querySelectorAll('.complete_btn'),
  btnCancel = document.querySelectorAll('.cancel_btn'),
  btnProcessing = document.querySelectorAll('.processing_btn'),
  selecToothtHall = document.querySelectorAll('.tooth_select [data-toothall] .tooth input');

if (btnComplete.length > 0) {
  btnComplete.forEach(function (el) {
	el.addEventListener('click', toggleStatus)
  })
}
if (btnCancel.length > 0) {
  btnCancel.forEach(function (el) {
	el.addEventListener('click', toggleStatus)
  })
}
if (btnProcessing.length > 0) {
  btnProcessing.forEach(function (el) {
	el.addEventListener('click', toggleStatus)
  })
}
if (btnImplant.length > 0) {
  btnImplant.forEach(function (el) {
	el.addEventListener('click', selectImplant)
  })
}
if (btnPontic.length > 0) {
  btnPontic.forEach(function (el) {
	el.addEventListener('click', selectPontic)
  })
}
if (btnSelectTopToothHall) {
  btnSelectTopToothHall.forEach(function (el) {
	el.addEventListener('click', selectTop)
  })
}
if (btnSelectAllToothHall) {
  btnSelectAllToothHall.forEach(function (el) {
	el.addEventListener('click', selectAll)
  })
}
if (btnSelectBottomToothHall) {
  btnSelectBottomToothHall.forEach(function (el) {
	el.addEventListener('click', selectBottom)
  })
}
if (btnSelectTopChild) {
  btnSelectTopChild.forEach(function (el) {
	el.addEventListener('click', selectTopChild)
  })
}
if (btnSelectAllChild) {
  btnSelectAllChild.forEach(function (el) {
	el.addEventListener('click', selectAllChild)
  })
}
if (btnSelectBottomChild) {
  btnSelectBottomChild.forEach(function (el) {
	el.addEventListener('click', selectBottomChild)
  })
}
if (btnTooth.length) {
  btnTooth.forEach(function (el) {
	var id = el.closest('.tooth_select').getAttribute('id');
	el.querySelector('input').setAttribute('id', el.querySelector('input').getAttribute('id') + id)
	el.querySelector('label').setAttribute('for', el.querySelector('label').getAttribute('for') + id)
	el.addEventListener('mousedown', selectToothClick);
	el.addEventListener('contextmenu', rightClickSelect);
  })
}
if (tooth.length > 0) {
  tooth.forEach(function (el) {
	var btnInterdental = el.querySelectorAll('[data-interdental]');
	if (btnInterdental.length > 0) {
	  btnInterdental.forEach(function (el) {
		el.addEventListener('click', funcGums);
	  })
	}
	var gums = el.querySelectorAll('.gums');
	if (gums.length > 0) {
	  gums.forEach(function (el) {
		var id = el.closest('.tooth_select').getAttribute('id');
		el.querySelector('input').setAttribute('id', el.querySelector('input').getAttribute('id') + id)
		el.querySelector('label').setAttribute('for', el.querySelector('label').getAttribute('for') + id)
		el.querySelector('input').addEventListener('change', function () {
		  var data = ''
		  var btnInterdental = this.closest('.tooth_select').querySelectorAll('[data-interdental]');
		  btnInterdental.forEach(function (el) {
			if (el.classList.contains('is_active')) {
			  data += el.dataset.interdental;
			}
		  })
		  if (data.includes('screw')) {
			this.nextElementSibling.classList.toggle('screw');
			if (this.nextElementSibling.classList.contains('loop') && !this.checked) {
			  this.nextElementSibling.classList.remove('loop')
			  this.checked = true;
			}
		  } else if (data.includes('loop')) {
			this.nextElementSibling.classList.toggle('loop');
			if (this.nextElementSibling.classList.contains('screw') && !this.checked) {
			  this.nextElementSibling.classList.remove('screw')
			  this.checked = true;
			}
		  }
		});
	  })
	}
	var chargeItems = document.querySelectorAll('[data-individuallyapply]'),
	  btnBatchApplys = document.querySelectorAll('.btn[data-batchapply]');
	if (chargeItems.length > 0) {
	  chargeItems.forEach(function (e) {
		e.addEventListener('click', function () {
		  e.classList.toggle('is_active');
		})
	  });
	}
	if (btnBatchApplys.length > 0) {
	  btnBatchApplys.forEach(function (e) {
		e.addEventListener('click', function () {
		  var cont = this.dataset.batchapply;
		  chargeItems.forEach(function (i) {
			if (cont == 'deselect_all') {
			  i.classList.remove('is_active');
			} else if (cont == i.dataset.individuallyapply) {
			  i.classList.add('is_active');
			}
		  })
		})
	  })
	}
  })
}
function toggleStatus() {
  if (!this.classList.contains('is_active')) this.parentNode.querySelector('.is_active')?.classList.remove('is_active');
  this.classList.toggle('is_active');
  if (this.classList.contains('is_active')) {
	active_fn = Array.from(this.parentNode.querySelectorAll('.btn')).indexOf(this) + 1;
  } else {
	active_fn = null
  }
}
function selectToothClick(e) {
  if (this.closest('[data-toothall]')) {
	var inputSelect = this.querySelector('input'),
	  toothId = inputSelect.id,
	  btnImplant = this.closest('.tooth_select').querySelector('.btn_implant'),
	  btnPontic = this.closest('.tooth_select').querySelector('.btn_pontic');
	if (e.which == 1) {
	  toothMapCheck(toothId);
	} else if (e.which == 2 && !btnImplant?.classList.contains('is_selected') && !btnPontic?.classList.contains('is_selected') && btnImplant && btnPontic) {
	  this.classList.remove('pontic_selected', 'implant_selected')
	  this.classList.add('pontic_selected');
	  if (this.querySelector('.tooth_state')) {
		this.querySelector('.tooth_state').style.display = 'none';
	  }
	  inputSelect.checked = true;
	  toothMapCheck(toothId);
	} else if (e.which == 3 && !btnImplant?.classList.contains('is_selected') && !btnPontic?.classList.contains('is_selected') && btnImplant && btnPontic) {
	  this.classList.remove('pontic_selected', 'implant_selected')
	  this.classList.add('implant_selected');
	  if (this.querySelector('.tooth_state')) {
		this.querySelector('.tooth_state').style.display = 'none';
	  }
	  inputSelect.checked = true;
	  toothMapCheck(toothId);
	}
  }
  if (this.closest('.tooth_process_select')) {
	if (!this.classList.contains('is_registered') || (active_fn !== null && e.which !== 1)) return false;
	var caseNum = active_fn !== null ? active_fn : e.which;
	toothProcessSelect.call(this, caseNum);
	this.querySelector('input').checked = true;
  }
}
function toothProcessSelect(caseNum) {
  switch (caseNum) {
	case 1: this.classList.toggle('is_completed');
	  this.classList.remove('is_cancel', 'is_processing');
	  break;
	case 3: this.classList.toggle('is_cancel');
	  this.classList.remove('is_completed', 'is_processing');
	  break;
	case 2: this.classList.toggle('is_processing');
	  this.classList.remove('is_completed', 'is_cancel');
	  break;
  }
}
function rightClickSelect(e) {
  e.preventDefault();
}
selecToothtHall?.forEach(function (el) {

  el.addEventListener('change', function () {
	var btnImplant = this.closest('.tooth_select').querySelector('.btn_implant'),
	  btnPontic = this.closest('.tooth_select').querySelector('.btn_pontic');
	if (btnImplant?.classList.contains('is_selected')) {
	  if (!this.parentElement.classList.contains('implant_selected')) {
		this.parentElement.classList.add('implant_selected');
		this.parentElement.classList.remove('pontic_selected');
		this.checked = true;
	  } else {
		this.parentElement.classList.remove('implant_selected');
		this.checked = false;
	  }
	  if (this.parentElement.querySelector('.tooth_state')) {
		this.parentElement.querySelector('.tooth_state').style.display = 'none';
	  }
	} else if (btnPontic?.classList.contains('is_selected')) {
	  if (!this.parentElement.classList.contains('pontic_selected')) {
		this.parentElement.classList.add('pontic_selected');
		this.parentElement.classList.remove('implant_selected');
		this.checked = true;
	  } else {
		this.parentElement.classList.remove('pontic_selected');
		this.checked = false;
	  }
	  if (this.parentElement.querySelector('.tooth_state')) {
		this.parentElement.querySelector('.tooth_state').style.display = 'none';
	  }
	} else {
	  if (this.closest('.implant_selected') || this.closest('.pontic_selected')) {
		this.checked = true;
	  }
	}

  })
})
function offClickToothChild() {
  var selectToothChild = this.closest('.tooth_select').querySelectorAll('[data-toothchild] .tooth input');
  selectToothChild.forEach(function (el) {
	var btnImplant = el.closest('.tooth_select').querySelector('.btn_implant'),
	  btnPontic = el.closest('.tooth_select').querySelector('.btn_pontic');
	if (btnImplant.classList.contains('is_selected') || btnPontic.classList.contains('is_selected')) {
	  el.parentElement.style.pointerEvents = 'none';
	} else {
	  el.parentElement.style.pointerEvents = 'auto';
	}
  });
}
function selectImplant() {
  if (!this.classList.contains('is_selected')) {
	var allBtnExpression = this.closest('[data-expression]').querySelectorAll('button');
	allBtnExpression.forEach(function (el) {
	  el.classList.remove('is_selected')
	});
	this.classList.add('is_selected');
  } else {
	this.classList.remove('is_selected');
  }
  offClickToothChild.call(this);
}
function selectPontic() {
  if (!this.classList.contains('is_selected')) {
	var allBtnExpression = this.closest('[data-expression]').querySelectorAll('button');
	allBtnExpression.forEach(function (el) {
	  el.classList.remove('is_selected')
	});
	this.classList.add('is_selected');
  } else {
	this.classList.remove('is_selected');
  }
  offClickToothChild.call(this);
}
function toothMapCheck(toothId) {
  if (toothMap.length) {
	toothMap.forEach(function (el) {
	  el.querySelectorAll('[data-tooth]').forEach(function (el) {
		if (el.dataset.tooth == toothId) {
		  if (!el.classList.contains('is_visible')) {
			el.classList.add('is_visible')
		  } else {
			el.classList.remove('is_visible')
		  }
		}
	  })
	})
  }
}
function selectTop() {
  var toothList = this.closest('.tooth_select').querySelectorAll('[data-toothall]:not(.tooth_list_bottom) .tooth input');
  var btnSelectTopToothHall = this.closest('.tooth_select').querySelector('[data-selecttop]'),
	btnSelectAllToothHall = this.closest('.tooth_select').querySelector('[data-selectall]'),
	btnSelectBottomToothHall = this.closest('.tooth_select').querySelector('[data-selectbottom]');
  if (this.classList.contains('is_checked')) {
	btnSelectTopToothHall.classList.remove('is_checked');
	btnSelectAllToothHall.classList.remove('is_checked');
  } else {
	this.classList.add('is_checked');
	if (btnSelectBottomToothHall.classList.contains('is_checked')) {
	  btnSelectAllToothHall.classList.add('is_checked');
	}
  }
  toothList.forEach(function (el) {
	if (btnSelectTopToothHall.classList.contains('is_checked')) {
	  el.checked = true;
	} else {
	  el.checked = false;
	  if (el.closest('.implant_selected') || el.closest('.pontic_selected')) {
		el.checked = true;
	  }
	}
  })
}
function selectAll() {
  var toothList = this.closest('.tooth_select').querySelectorAll('[data-toothall] .tooth input');
  var btnSelectTopToothHall = this.closest('.tooth_select').querySelector('[data-selecttop]'),
	btnSelectBottomToothHall = this.closest('.tooth_select').querySelector('[data-selectbottom]');
  if (this.classList.contains('is_checked')) {
	btnSelectTopToothHall.classList.remove('is_checked');
	btnSelectBottomToothHall.classList.remove('is_checked');
	this.classList.remove('is_checked');
	toothList.forEach(function (el) {
	  el.checked = false;
	  if (el.closest('.implant_selected') || el.closest('.pontic_selected')) {
		el.checked = true;
	  }
	})
  } else {
	this.classList.add('is_checked');
	btnSelectTopToothHall.classList.add('is_checked');
	btnSelectBottomToothHall.classList.add('is_checked');
	toothList.forEach(function (el) {
	  el.checked = true;
	})
  }
}
function selectBottom() {
  var toothList = this.closest('.tooth_select').querySelectorAll('[data-toothall].tooth_list_bottom .tooth input');
  var btnSelectTopToothHall = this.closest('.tooth_select').querySelector('[data-selecttop]'),
	btnSelectAllToothHall = this.closest('.tooth_select').querySelector('[data-selectall]'),
	btnSelectBottomToothHall = this.closest('.tooth_select').querySelector('[data-selectbottom]');
  if (this.classList.contains('is_checked')) {
	this.classList.remove('is_checked');
	btnSelectAllToothHall.classList.remove('is_checked');
  } else {
	this.classList.add('is_checked');
	if (btnSelectTopToothHall.classList.contains('is_checked')) {
	  btnSelectAllToothHall.classList.add('is_checked');
	}
  }
  toothList.forEach(function (el) {
	if (btnSelectBottomToothHall.classList.contains('is_checked')) {
	  el.checked = true;
	} else {
	  el.checked = false;
	  if (el.closest('.implant_selected') || el.closest('.pontic_selected')) {
		el.checked = true;
	  }
	}
  })
}
function selectTopChild() {
  var toothList = this.closest('.tooth_select').querySelectorAll('[data-toothchild]:not(.tooth_list_bottom) .tooth input'),
	btnSelectTopChild = this.closest('.tooth_select').querySelector('[data-selecttop-child]'),
	btnSelectAllChild = this.closest('.tooth_select').querySelector('[data-selectall-child]'),
	btnSelectBottomChild = this.closest('.tooth_select').querySelector('[data-selectbottom-child]');
  if (this.classList.contains('is_checked')) {
	btnSelectTopChild.classList.remove('is_checked');
	btnSelectAllChild.classList.remove('is_checked');
  } else {
	this.classList.add('is_checked');
	if (btnSelectBottomChild.classList.contains('is_checked')) {
	  btnSelectAllChild.classList.add('is_checked');
	}
  }
  toothList.forEach(function (el) {
	if (btnSelectTopChild.classList.contains('is_checked')) {
	  el.checked = true;
	} else {
	  el.checked = false;
	}
  })
}
function selectAllChild() {
  var toothList = this.closest('.tooth_select').querySelectorAll('[data-toothchild] .tooth input'),
	btnSelectTopChild = this.closest('.tooth_select').querySelector('[data-selecttop-child]'),
	btnSelectBottomChild = this.closest('.tooth_select').querySelector('[data-selectbottom-child]');
  if (this.classList.contains('is_checked')) {
	btnSelectTopChild.classList.remove('is_checked');
	btnSelectBottomChild.classList.remove('is_checked');
	this.classList.remove('is_checked');
	toothList.forEach(function (el) {
	  el.checked = false;
	})
  } else {
	this.classList.add('is_checked');
	btnSelectTopChild.classList.add('is_checked');
	btnSelectBottomChild.classList.add('is_checked');
	toothList.forEach(function (el) {
	  el.checked = true;
	})
  }
}
function selectBottomChild() {
  var toothList = this.closest('.tooth_select').querySelectorAll('[data-toothchild].tooth_list_bottom .tooth input'),
	btnSelectAllChild = this.closest('.tooth_select').querySelector('[data-selectall-child]'),
	btnSelectTopChild = this.closest('.tooth_select').querySelector('[data-selecttop-child]'),
	btnSelectBottomChild = this.closest('.tooth_select').querySelector('[data-selectbottom-child]');
  if (this.classList.contains('is_checked')) {
	this.classList.remove('is_checked');
	btnSelectAllChild.classList.remove('is_checked');
  } else {
	this.classList.add('is_checked');
	if (btnSelectTopChild.classList.contains('is_checked')) {
	  btnSelectAllChild.classList.add('is_checked');
	}
  }
  toothList.forEach(function (el) {
	if (btnSelectBottomChild.classList.contains('is_checked')) {
	  el.checked = true;
	} else {
	  el.checked = false;
	}
  })
}

function funcGums() {
  var data, _this = this;
  this.closest('.btn_wrap').querySelectorAll('button').forEach(function (el) {
	if (el == _this && !_this.classList.contains('is_active')) {
	  el.classList.add('is_active');
	  data = el.dataset.interdental;
	} else {
	  el.classList.remove('is_active');
	}
  })
  // var gums = this.closest('.tooth_select').querySelectorAll('.gums');
  // gums.forEach(function (el) {
  //   if (data === 'elastic') {
  //     el.style.pointerEvents = 'none';
  //   } else {
  //     el.style.pointerEvents = 'auto';
  //   }
  // })

  this.closest('.tooth_select').querySelectorAll('[data-expression] button').forEach(function(el) {
	if(data) {
	  if (el.classList.contains('is_selected') && data) {
		el.classList.remove('is_selected');
	  }
	  el.style.pointerEvents = 'none';
	} else {
	  el.style.pointerEvents = 'auto';
	}
  })
  if (data) {
	hide.call(this);
  } else {
	show.call(this);
  }

}

function hide() {
  var btnList = this.closest('.tooth_select').querySelectorAll('.btn_list'),
	toothChild = this.closest('.tooth_select').querySelectorAll('[data-toothchild]'),
	btnSub = this.closest('.tooth_select').querySelector('.btn_sub_interdental'),
	gums = this.closest('.tooth_select').querySelectorAll('.gums');
  btnList.forEach(function (el) {
	el.style.visibility = "hidden";
  });
  toothChild.forEach(function (el) {
	el.style.visibility = "hidden";
  });
  btnSub.style.display = "block";
  this.closest('.tooth_select').querySelector('.info').style.visibility = "hidden";
  gums.forEach(function (el) {
	el.style.display = "block";
	el.querySelector('label').classList.remove('done');
  })
}
function show() {
  var btnList = this.closest('.tooth_select').querySelectorAll('.btn_list'),
	toothChild = this.closest('.tooth_select').querySelectorAll('[data-toothchild]'),
	btnSub = this.closest('.tooth_select').querySelector('.btn_sub_interdental'),
	gums = this.closest('.tooth_select').querySelectorAll('.gums');
  btnList.forEach(function (el) {
	el.style.visibility = "visible";
  });
  toothChild.forEach(function (el) {
	el.style.visibility = "visible";
  });
  btnSub.style.display = "none";
  document.querySelector('.info').style.visibility = "visible";
  gums.forEach(function (el) {
	el.style.display = "none";
	let labelActive = el.querySelector('label');
	if (labelActive.className) {
	  labelActive.classList.add('done');
	  labelActive.previousElementSibling.checked = true;
	  labelActive.closest('.gums').style.display = 'block';
	}
  })
}
