// import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getImage } from './js/fetch-img.js';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', searchImg);

function searchImg(event) {
  event.preventDefault();
  refs.gallery.innerHTML = '';

  const { searchQuery } = event.target.elements;
  const MatchedImages = getImage(searchQuery.value);

  MatchedImages.then(images => {
    const galleryMarkup = images.map(img => makeImgCard(img)).join('');
    makeGallery(galleryMarkup);
  });
}

function makeImgCard({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<div class="photo-card">
                  <img src="${webformatURL}" alt="" loading="lazy" width="400" />
                  <div class="info">
                    <p class="info-item">
                      <b>Likes: ${likes}</b>
                    </p>
                    <p class="info-item">
                      <b>Views: ${views}</b>
                    </p>
                    <p class="info-item">
                      <b>Comments: ${comments}</b>
                    </p>
                    <p class="info-item">
                      <b>Downloads: ${downloads}</b>
                    </p>
                  </div>
                </div>`;
}

function makeGallery(images) {
  refs.gallery.innerHTML = images;
}
