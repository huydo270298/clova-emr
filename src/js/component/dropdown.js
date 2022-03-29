var dropdown = document.querySelectorAll('.dropdown');
window.addEventListener('mousedown', function (event) {
  dropdown.forEach(function (e) {
    if (event.target.closest('.dropdown_btn') !== e.querySelector('.dropdown_btn') && event.target.closest('.dropdown.open') === null) {
      e.classList.remove('open');
      e.querySelector('.dropdown_option')?.dispatchEvent(new CustomEvent('close', { detail: { closeOther: document.querySelectorAll('.dropdown.open').length > 0 } }));
    }
  })
})
if (dropdown.length > 0) {
  dropdown.forEach(function (e) {
    var btn = e.querySelector('.dropdown_btn');
    if (e.querySelector('.dropdown_option[type="context"]') !== null) {
      btn.addEventListener('contextmenu', toggleDropdown.bind(btn, true))
    }
    if (btn !== null) btn.addEventListener('click', toggleDropdown)
  })
}

var closeDropdown = new CustomEvent('close');
var manualScroll = false;

function toggleDropdown() {
  scrollToView(this);
  this.focus();
  var event = arguments[arguments.length - 1];
  var context = arguments.length === 1 ? false : arguments[0];
  event.preventDefault();
  var menu = context ? this.parentNode.querySelector('.dropdown_option[type="context"]') : this.parentNode.querySelector('.dropdown_option:not([type="context"])');
  if (menu !== null) {
    menu.parentNode.classList.toggle('open');
    if (!menu.parentNode.classList.contains('open')) {
      menu.dispatchEvent(closeDropdown)
    } else {
      var css = menu.getBoundingClientRect(),
        cssParent = menu.parentNode.getBoundingClientRect(),
        menuMaxH = parseInt(window.getComputedStyle(menu).maxHeight),
        menuContent = menu.querySelector('.simplebar-content') === null? menu : menu.querySelector('.simplebar-content'),
        menuHeight = menuContent.getBoundingClientRect().height >= menuMaxH ? menuMaxH : menuContent.getBoundingClientRect().height;;
      menu.style.position = 'fixed';
      if (css.left + css.width >= window.innerWidth) {
        menu.style.right = (window.innerWidth - cssParent.left - cssParent.width) + 'px';
        menu.style.left = 'auto';
      } else {
        menu.style.left = css.left + 'px';
        menu.style.right = 'auto';
      }
      if (css.top + menuHeight >= window.innerHeight) {
        menu.style.bottom = (window.innerHeight - cssParent.top + 10) + 'px';
        menu.style.top = 'auto';
      } else {
        menu.style.top = css.top + 'px';
        menu.style.bottom = 'auto';
      }
      menu.style.width = css.width + 'px';
      menu.style.height = menuHeight + 'px';
      menu.style.margin = '0';
      if (menu.closest('.row') !== null) menu.closest('.row').style.zIndex = 2;
      window.addEventListener('scroll', closeCustomDrop.bind(menu), { once: true });
      menu.addEventListener('close', closeCustomDrop, { once: true });
      document.querySelector('.wrap').addEventListener('scroll', closeCustomDrop, { once: true });
    }
  }
}

function closeCustomDrop(e) {
  if (!e.detail?.closeOther && this.closest('.row') !== null) this.closest('.row').style.zIndex = '';
  this.parentNode.classList.remove('open');
  this.removeAttribute('style');
  if (document.querySelector('[prevent-scroll-event]') !== null) document.querySelector('[prevent-scroll-event]').removeAttribute('prevent-scroll-event')
}

function scrollToView(el) {
  var p = el.closest('.simplebar-content-wrapper') === null ? el.parentNode : el.closest('.simplebar-content-wrapper'),
    coord = el.getBoundingClientRect();
  if (isElementInView(el, p)) return false;
  p.setAttribute('prevent-scroll-event', '')
  p.scrollTo(coord.top, coord.left);
}

function isElementInView(el, viewport) {
  var elInset = {
    top: el.getBoundingClientRect().top - viewport.getBoundingClientRect().top + viewport.scrollTop,
    left: el.getBoundingClientRect().left - viewport.getBoundingClientRect().left + viewport.scrollLeft,
    right: el.getBoundingClientRect().left - viewport.getBoundingClientRect().left + viewport.scrollLeft + el.getBoundingClientRect().width,
    bottom: el.getBoundingClientRect().top - viewport.getBoundingClientRect().top + viewport.scrollLeft + el.getBoundingClientRect().height
  },
    viewportInset = {
      top: viewport.scrollTop,
      left: viewport.scrollLeft,
      right: viewport.scrollLeft + viewport.offsetWidth,
      bottom: viewport.scrollTop + viewport.offsetHeight
    };
  return (elInset.top >= viewportInset.top &&
    elInset.left >= viewportInset.left &&
    elInset.right <= viewportInset.right &&
    elInset.bottom <= viewportInset.bottom)
}
