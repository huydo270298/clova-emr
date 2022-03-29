var customScrollEL = document.querySelectorAll('[data-simplebar]');

if (customScrollEL.length > 0) {
  customScrollEL.forEach(function (el) {
    if (el.closest('.select_opt,.dropdown_option') === null) {
      var simpleBar = new SimpleBar(el);
      simpleBar.getScrollElement().addEventListener('scroll', closeAllDropdown.bind(simpleBar));
    }
  })
}

function closeAllDropdown() {
  if (this.getScrollElement().hasAttribute('prevent-scroll-event')) {
    return false;
  }
  var dropdown = document.querySelector('.dropdown.open, .select.open');
  if (dropdown !== null) {
    dropdown.querySelector('.dropdown_option, .select_opt').dispatchEvent(new CustomEvent('close'));
  }
}
