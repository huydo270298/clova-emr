var photo_items = document.querySelectorAll('.photos_box .list .item');
if(photo_items.length > 0){
  photo_items.forEach(function(el){
	el.addEventListener('click',function(){
	  this.classList.toggle('is_selected')
	})
	})
}
