import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImage } from './js/fetch-img.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import InfiniteScroll from 'infinite-scroll';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
let currentQuery = '';
const lightbox = new SimpleLightbox('.gallery a');

refs.form.addEventListener('submit', searchImg);
refs.loadMoreBtn.addEventListener('click', loadAndRenderImgs);

function searchImg(event) {
  event.preventDefault();
  refs.gallery.innerHTML = '';

  const { searchQuery } = event.target.elements;
  currentQuery = searchQuery.value;
  if (currentQuery) {
    loadAndRenderImgs();
  } else {
    hideLoadMoreBtn();
    Notify.info('Enter a query');
  }
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
            <div class="photo-card-img-wrapper">
            <a href="${largeImageURL}">
              <img
                class="photo-card-img"
                src="${webformatURL}"
                alt="${tags}"
                loading="lazy"
              />
            </a>
            </div>
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
  refs.gallery.insertAdjacentHTML('beforeend', images);
  lightbox.refresh();
}

function loadAndRenderImgs() {
  const MatchedImages = getImage(currentQuery);

  hideLoadMoreBtn();

  MatchedImages.then(({ images, page }) => {
    if (images === 'end') {
      hideLoadMoreBtn();
      Notify.info("We're sorry, but you've reached the end of search results.");

      return;
    }

    if (images) {
      showLoadMoreBtn();
      const galleryMarkup = images.map(img => makeImgCard(img)).join('');
      makeGallery(galleryMarkup);
      if (page > 2) {
        const { height: cardHeight } = document
          .querySelector('.gallery')
          .firstElementChild.getBoundingClientRect();

        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
      }
    } else {
      return;
    }
  }).catch(error => console.log(error));
}

function hideLoadMoreBtn() {
  refs.loadMoreBtn.classList.add('is-hidden');
}

function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}

// scroll to top
const toTopBtn = document.getElementById('myBtn');

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    toTopBtn.style.display = 'block';
    toTopBtn.addEventListener('click', topFunction);
  } else {
    toTopBtn.style.display = 'none';
  }
}

function topFunction() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
