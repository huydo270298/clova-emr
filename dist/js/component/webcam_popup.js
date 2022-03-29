var capture_imgs = document.querySelectorAll('.captured_images .images_lst li');
if(capture_imgs.length > 0){
	capture_imgs.forEach(function(el){
		el.addEventListener('click',function(){
			this.classList.toggle('selected')
		})
	})
}