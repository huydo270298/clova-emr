var photoBoxList = document.querySelectorAll('.photo_list[data-slider] .photo_box');
if (photoBoxList.length > 0) {
  photoBoxList.forEach(function (photoBox) {
	photoBox.addEventListener('click', selectPhoto)
  })
}
function selectPhoto() {
  var slider = document.getElementById(this.closest('.photo_list').getAttribute('data-slider'));
  this.closest('.photo_list').querySelector('.selected')?.classList.remove('selected');
  this.classList.add('selected');
  updateSlide.call(slider, this);
}

function updateSlide(info) {
  var nameSpan = this.querySelector('.name'),
	timeSpan = this.querySelector('.time'),
	sizeSpan = this.querySelector('.size'),
	img = this.querySelector('.photo_box img'),
	data = {
	  name: info.getAttribute('data-info'),
	  time: info.getAttribute('data-time'),
	  size: info.getAttribute('data-size'),
	  imgSrc: info.querySelector('img').src
	};
  nameSpan.innerText = data.name;
  timeSpan.innerText = data.time;
  sizeSpan.innerText = data.size;
  img.src = data.imgSrc;
}

var photoSlides = document.querySelectorAll('.photo_slide');

if (photoSlides.length > 0) {
  photoSlides.forEach(function (photoSlide) {
	initSlide.call(photoSlide);
  })
}

function initSlide() {
  var prevBtn = this.querySelector('.prev_btn'),
	nextBtn = this.querySelector('.next_btn');
  prevBtn?.addEventListener('click', goToSlide.bind(this, 'prev'));
  nextBtn?.addEventListener('click', goToSlide.bind(this, 'next'));
}

function goToSlide(dir) {
  var photoList = document.querySelector('[data-slider=' + this.id + ']').querySelectorAll('.photo_box');
  var currentIndex = null;
  photoList.forEach(function (photo, index) {
	if (photo.classList.contains('selected')) currentIndex = index;
  })
  var comingIndex = dir === 'prev' ? currentIndex - 1 < 0 ? 0 : currentIndex - 1 : currentIndex + 1 === photoList.length ? currentIndex : currentIndex + 1;
  selectPhoto.call(photoList.item(comingIndex))
}
