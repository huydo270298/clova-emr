var resizeIndicator = document.querySelectorAll('.resize_indicator');

if (resizeIndicator.length > 0) {
    resizeIndicator.forEach(function (el) {
        el.addEventListener('mousedown', resizeParent);
    })
}
function resizeParent(e) {
    e.preventDefault();
    var _this = this,
        pos = this.getBoundingClientRect(),
        resizeEl = this.parentNode,
        nextEl = resizeEl.nextElementSibling,
        width = resizeEl.getBoundingClientRect().width,
        height = resizeEl.getBoundingClientRect().height,
        nextElWidth = nextEl?.getBoundingClientRect().width,
        calculateDis = function (e) {
          if(!_this.hasAttribute('resize-height')) {
            var dis = e.clientX - pos.x;
            resizeEl.style.width = (width + dis) + 'px';
            if (nextEl?.classList.contains('col')) {
                nextEl.style.width = (nextElWidth - dis) + 'px'
            }
          } else {
            var dis = e.clientY - pos.y;
            resizeEl.style.height = (height + dis) + 'px';
          }
        },
        stopResize = function () {
            document.removeEventListener('mousemove', calculateDis);
        };
    document.addEventListener('mousemove', calculateDis);
    document.addEventListener('mouseup', stopResize, { once: true })
}
