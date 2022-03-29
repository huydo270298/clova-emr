// reorder

var reorderItems = document.querySelectorAll('.list[data-reorder]');

if(reorderItems.length>0){
  reorderItems.forEach(function(item){
    var it = item.querySelectorAll('.item');
    it.forEach(function(el){
      el.addEventListener('mousedown',startDragListEl)
    })
  });

  function startDragListEl(e){
    var elPos = this.getBoundingClientRect(),
    mousePos = {
      top: e.clientY - elPos.top,
      left: e.clientX - elPos.left
    },
    elClone = this.cloneNode(true);
    elClone.classList.add('cloned');
    elClone.style.top = elPos.top+'px';
    elClone.style.left = elPos.left+'px';
    this.parentNode.classList.add('has_drag')
    this.parentNode.append(elClone);
    this.classList.add('is_ondrag');
    var mousemoveHandler = draggingListItem.bind(elClone,mousePos)
    document.addEventListener('mousemove', mousemoveHandler);
    document.addEventListener('mouseup',stopAndDropListItem.bind(elClone,mousemoveHandler),{once:true});
  }
  function stopAndDropListItem(mousemoveHandler,e){
    document.removeEventListener('mousemove',mousemoveHandler);
    var movedEl = this.parentNode.querySelector('.is_ondrag');
    this.parentNode.classList.remove('has_drag');
    movedEl.classList.remove('is_ondrag');
    movedEl.parentNode.querySelectorAll('.item').forEach(function(el){
      el.removeEventListener('mouseover',listItemOver);
      el.removeEventListener('mousemove',positioningDragItem);
    })
    this.remove();

  }
  function draggingListItem(mousePos, e){
    this.style.top = (e.clientY - mousePos.top)+'px';
    this.style.left = (e.clientX - mousePos.left)+'px';
    reOrderListItemPos.call(this.parentNode.querySelector('.is_ondrag'));
  }
  function reOrderListItemPos(){
    var siblingEls = this.parentNode.querySelectorAll('.item:not(.cloned)');
    if(siblingEls.length>0){
      siblingEls.forEach(function(el){
        el.addEventListener('mouseover',listItemOver,{once: true})
      })
    }
  }
  function listItemOver(){
    if(!this.classList.contains('is_ondrag')){
        this.addEventListener('mousemove',positioningDragItem);
    }
  }
  function positioningDragItem(e){
    var itemPos = this.getBoundingClientRect(),
        dragItem = this.parentNode.querySelector('.is_ondrag')
        mouseLeftPos = e.clientX - itemPos.left;
    if(mouseLeftPos >= (itemPos.width/2)){
      // After
      if(!this.nextElementSibling?.classList.contains('is_ondrag')){
        this.insertAdjacentElement('afterend',dragItem);
      }
    } else {
      // Before
      if(!this.previousElementSibling?.classList.contains('is_ondrag')){
        this.insertAdjacentElement('beforebegin',dragItem);
      }
    }
  }
}
