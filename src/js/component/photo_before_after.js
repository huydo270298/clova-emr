var photoBeforeAfter = document.querySelectorAll('.photo_before_after');
var pairClick = null;
var dragMode = false;
if (photoBeforeAfter.length > 0) {
  photoBeforeAfter.forEach(function (pair) {
    pair.addEventListener('mouseup', selectPair);
    if (pair.closest('.before_after_list').hasAttribute('data-drag-order')) {
      pair.addEventListener('mousedown', startPairDrag)
    }
  })
}

function startPairDrag(e) {
  clearTimeout(pairClick);
  pairClick = setTimeout(function () {
    dragMode = true;
    var pairPos = this.parentNode.getBoundingClientRect(),
      mousePos = {
        top: e.clientY - pairPos.top,
        left: e.clientX - pairPos.left
      },
      elClone = this.parentNode.cloneNode(true);
    elClone.classList.add('cloned');
    elClone.style.top = pairPos.top + 'px';
    elClone.style.left = pairPos.left + 'px';
    elClone.style.width = pairPos.width + 'px';
    this.closest('.before_after_list').append(elClone);
    this.parentNode.classList.add('is_ondrag');
    document.documentElement.style.cursor = 'grabbing';
    var mousemoveHandler = draggingPairItem.bind(elClone, mousePos);
    document.addEventListener('mousemove', mousemoveHandler);
    document.addEventListener('mouseup', dropPairItem.bind(elClone, mousemoveHandler), { once: true });
  }.bind(this), 75);
}

function dropPairItem(mousemoveHandler, e) {
  document.removeEventListener('mousemove', mousemoveHandler);
  var movedEl = this.parentNode.querySelector('.is_ondrag'),
    placeholder = this.parentNode.querySelector('.placeholder');
  if (placeholder !== null) {
    placeholder.insertAdjacentElement('beforebegin', movedEl);
    placeholder.remove();
  }
  document.documentElement.style.cursor = '';
  movedEl.classList.remove('is_ondrag');
  movedEl.closest('.before_after_list').querySelectorAll('li').forEach(function (li) {
    li.removeEventListener('mouseover', pairSiblingOver);
    li.removeEventListener('mousemove', positioningPairPlaceholder);
    li.removeEventListener('mouseleave', removePairPlaceholder);
  })
  this.remove();
  dragMode = false;
}

function draggingPairItem(mousePos, e) {
  this.style.top = (e.clientY - mousePos.top) + 'px';
  this.style.left = (e.clientX - mousePos.left) + 'px';
  reOrderPairPos.call(this.parentNode.querySelector('.is_ondrag'));
}

function reOrderPairPos() {
  var siblingEls = this.closest('.before_after_list').querySelectorAll('li:not(.is_ondrag):not(.cloned)');
  if (siblingEls.length > 0) {
    siblingEls.forEach(function (li) {
      li.addEventListener('mouseover', pairSiblingOver, { once: true })
    })
  }
}

function pairSiblingOver() {
  var placeholder = this.closest('.before_after_list').querySelector('.placeholder');
  if (placeholder === null) {
    placeholder = document.createElement('li');
    placeholder.classList.add('placeholder');
  }
  this.parentNode.append(placeholder);
  this.addEventListener('mousemove', positioningPairPlaceholder);
  this.addEventListener('mouseleave', removePairPlaceholder, { once: true });
}

function removePairPlaceholder() {
  this.closest('.before_after_list').querySelector('.placeholder')?.remove();
}

function positioningPairPlaceholder(e) {
  var liPos = this.getBoundingClientRect()
  mouseTopPos = e.clientY - liPos.top,
    placeholder = this.parentNode.querySelector('.placeholder'),
    ulTop = this.closest('.before_after_list').getBoundingClientRect().top;
  if (placeholder === null) {
    placeholder = document.createElement('li');
    placeholder.classList.add('placeholder');
  }
  if (mouseTopPos >= (liPos.height / 2)) {
    // Below
    if (!this.nextElementSibling?.classList.contains('is_ondrag')) {
      this.insertAdjacentElement('afterend', placeholder);
      placeholder.style.top = (liPos.top - ulTop + liPos.height + 11) + 'px';
    } else {
      placeholder.remove();
    }
  } else {
    // Above
    if (!this.previousElementSibling?.classList.contains('is_ondrag')) {
      this.insertAdjacentElement('beforebegin', placeholder);
      placeholder.style.top = (liPos.top - ulTop - 9) + 'px';
    } else {
      placeholder.remove();
    }
  }
}

function selectPair() {
  if (dragMode) return false;
  clearTimeout(pairClick);
  this.closest('.before_after_list').querySelector('.selected')?.classList.remove('selected');
  this.classList.add('selected');
  if (this.closest('[data-detail]')) {
    viewBeforeAfterData.call(this);
  }
  if (this.closest('[data-edit]')) {
    editBeforeAfterData.call(this);
  }
}

function editBeforeAfterData() {
  var editBox = document.getElementById(this.closest('[data-edit]')?.getAttribute('data-edit'));
  if (editBox) {
    var imgsList = this.querySelectorAll('img');
    if (imgsList.length > 0) {
      loadBeforeAfterData.call(this, imgsList, editBox)
    } else {
      clearEditBox.call(editBox)
    }
  }
}

function loadBeforeAfterData(imgsList, editBox) {
  editBox.querySelector('input[name="name"]').value = this.querySelector('.name').innerText;
  var imagePreview = editBox.querySelectorAll('.img'),
    imageText = editBox.querySelectorAll('input[name="imgDesc"]');
  imgsList.forEach(function (i, index) {
    var imgEdit = imagePreview.item(index).querySelector('img');
    if (imgEdit === null) {
      imgEdit = document.createElement('img');
      imagePreview.item(index).append(imgEdit);
    }
    imgEdit.src = i.src
    imageText.item(index).value = i.parentNode.getAttribute('data-txt')
  })
}

function clearEditBox() {
  this.querySelector('input[name="name"]').value = '새 치료 전후 사진';
  this.querySelectorAll('img').forEach(function (img) {
    img.remove();
  })
  this.querySelectorAll('input[name="imgDesc"]').forEach(function (input) {
    input.value = ''
  })
}

function viewBeforeAfterData() {
  var detailBox = document.getElementById(this.closest('[data-detail]')?.getAttribute('data-detail'));
  if (detailBox) {
    //clear
    detailBox.innerHTML = '';
    //set Data
    this.querySelectorAll('.img').forEach(function (image) {
      var viewBox = initViewDetailEl.call(detailBox);
      setViewDetailData.call(this, image, viewBox);
    }.bind(this))
  }
}
function initViewDetailEl() {
  var viewDetail = document.createElement('div');
  viewDetail.classList.add('view_detail');
  var name = document.createElement('strong');
  name.classList.add('name')
  var txt = document.createElement('p');
  txt.classList.add('detail_txt');
  var imgBox = document.createElement('div');
  imgBox.classList.add('img');
  var img = document.createElement('img');
  imgBox.appendChild(img);
  viewDetail.appendChild(name);
  viewDetail.appendChild(txt);
  viewDetail.appendChild(imgBox);
  this.appendChild(viewDetail);
  return viewDetail;
}
function setViewDetailData(img, viewBox) {
  var name = this.querySelector('.name').innerText,
    txt = img.getAttribute('data-txt'),
    imgSrc = img.querySelector('img').getAttribute('src');
  viewBox.querySelector('.name').innerText = name;
  viewBox.querySelector('.detail_txt').innerText = txt;
  viewBox.querySelector('img').setAttribute('src', imgSrc);
}
