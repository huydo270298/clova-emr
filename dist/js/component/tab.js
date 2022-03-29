var tabButtons = document.querySelectorAll('.tab_lst a'),
  photoBox = document.querySelectorAll('.photo_viewer'),
  navigationTabList = document.querySelectorAll('.tab_lst_box[data-tab-navigation]');

if (tabButtons.length > 0) {
  tabButtons.forEach(function (e) {
	e.addEventListener('click', changeTab)
  })
}

if (navigationTabList.length > 0) {
  navigationTabList.forEach(function (tabList) {
	var nextBtn = tabList.querySelector('.btn_next'),
	  prevBtn = tabList.querySelector('.btn_prev');
	var ob = new IntersectionObserver(function (entries) {
	  entries.forEach(function (entry) {
		entry.target.setAttribute('data-visible', entry.isIntersecting)
	  })
	  if (nextBtn) nextBtn.style.display = tabList.querySelector('.tab_item[data-visible="true"]:last-child') !== null ? 'none' : 'block';
	  if (prevBtn) prevBtn.style.display = tabList.querySelector('.tab_item[data-visible="true"]:first-child') !== null ? 'none' : 'block';
	}, {
	  root: tabList,
	  threshold: 0.99
	}),
	  targets = tabList.querySelectorAll('.tab_item');
	targets.forEach(function (t) {
	  ob.observe(t)
	});
	nextBtn?.addEventListener('click', nextTab.bind(tabList));
	prevBtn?.addEventListener('click', prevTab.bind(tabList));
  })
}

function changeTab(e) {
  e.preventDefault();
  var targetTab = document.querySelector(this.getAttribute('href'));
  if (targetTab !== null) {
	this.closest('.tab_lst').querySelector('.is_active').classList.remove('is_active')
	this.parentNode.classList.add('is_active');
	this.closest('.tab_group').querySelector('.tab.is_active').classList.remove('is_active');
	targetTab.classList.add('is_active');
	if (targetTab.hasAttribute('data-extra-content')) {
	  var extraCont = document.getElementById(targetTab.getAttribute('data-extra-content'));
	  extraCont.closest('.extra_tab_content').querySelector('.tab.is_active').classList.remove('is_active');
	  extraCont.classList.add('is_active');
	}
	if (this.closest('.tab_lst_box[data-tab-navigation]') !== null) {
	  scrollTabLeft.call(this);
	}
  }
}

if (photoBox.length > 0) {
  photoBox.forEach(function (el) {
	el.addEventListener("load", function () {
	  const btnNext = el.querySelector('.btn_next');
	  var tabItems = el.querySelectorAll('.tab_item'),
		width = 0;
	  if (tabItems.length > 0) {
		var sumWidthTabItems = 0;
		tabItems.forEach(function (el) {
		  sumWidthTabItems += el.offsetWidth;
		})
		console.log(sumWidthTabItems);
		if (sumWidthTabItems > width && btnNext) {
		  btnNext.style.display = 'block';
		} else {
		  btnNext.style.display = 'none';
		}
	  }
	  const resizeObserver = new ResizeObserver(function (entries) {
		for (let entry of entries) {
		  width = Math.floor(entry.contentRect.width);
		}
	  });
	  resizeObserver.observe(el);
	});
  })
}

function nextTab() {
  var lastVisible = this.querySelectorAll('[data-visible="true"]')[this.querySelectorAll('[data-visible="true"]').length - 1],
	pos = lastVisible.nextElementSibling.getBoundingClientRect().left - this.getBoundingClientRect().left;
  this.querySelector('.tab_lst').scrollLeft += pos;
}

function prevTab() {
  var firstVisible = this.querySelectorAll('[data-visible="true"]')[0],
	pos = firstVisible.previousElementSibling.getBoundingClientRect().left - this.getBoundingClientRect().left + this.getBoundingClientRect().width;
  this.querySelector('.tab_lst').scrollLeft -= pos;
}

function scrollTabLeft() {
  var tabList = this.closest('.tab_lst'),
  prevBtn = this.closest('.tab_lst_box').querySelector('.btn_prev'),
  nextBtn = this.closest('.tab_lst_box').querySelector('.btn_next');

  if (prevBtn && nextBtn) {
	prevSpec = prevBtn.getBoundingClientRect(),
	nextSpec = nextBtn.getBoundingClientRect(),
	thisSpec = this.getBoundingClientRect();
	if(prevBtn.style.display!=='none'){
	  if(thisSpec.left < (prevSpec.left+prevSpec.width)){
		tabList.scrollLeft -= (prevSpec.left+prevSpec.width-thisSpec.left)
	  }
	}
	if(nextBtn.style.display!=='none'){
	  if(thisSpec.left+thisSpec.width>nextSpec.left){
		tabList.scrollLeft += (thisSpec.left+thisSpec.width-nextSpec.left)
	  }
	}
  }
}
