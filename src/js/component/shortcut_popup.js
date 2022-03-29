var shortcutPopup = document.getElementById('shortcutPopup');
if (shortcutPopup) {
  var shortcutScroll = shortcutPopup.querySelector('.shortcut_scroll .simplebar-content-wrapper'),
      shortcutVirtualShadow = shortcutPopup.querySelector('.virtual_shadow');

  shortcutScroll.addEventListener('scroll', addShortcutPopupShadow);
    
  function addShortcutPopupShadow() {
    shortcutVirtualShadow.classList.toggle('show', this.scrollTop > 0);
  }
}
