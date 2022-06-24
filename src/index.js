import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
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
    // console.log(images);

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
            <a href="${largeImageURL}">
              <img
                class="photo-card-img"
                src="${webformatURL}"
                alt="${tags}"
                loading="lazy"
              />
            </a>
              <div class="info">
                <p class="info-item">
                  <span><b>Likes</b></span>
                  <span>${likes}</span>
                </p>
                <p class="info-item">
                  <span><b>Views</b></span>
                  <span>${views}</span>
                </p>
                <p class="info-item">
                  <span><b>Comments</b></span>
                  <span>${comments}</span>
                </p>
                <p class="info-item">
                  <span><b>Downloads</b></span>
                  <span>${downloads}</span>
                </p>
              </div>
            </div>`;
}

function makeGallery(images) {
  refs.gallery.innerHTML = images;
  const lightbox = new SimpleLightbox('.gallery a');
}
