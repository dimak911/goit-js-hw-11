import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
const BASE_URL = 'https://pixabay.com/';
let page = 1;
let currentQuery = '';

export async function getImage(query) {
  try {
    if (currentQuery !== query) {
      page = 1;
    }

    currentQuery = query;
    const response = await axios.get(`${BASE_URL}api/`, {
      params: {
        key: '28213280-eb811a12977e7e61e372ebe76',
        q: currentQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page,
        per_page: 40,
      },
    });

    const totalHits = response.data.totalHits;

    if (page * response.data.hits.length > totalHits) {
      return 'end';
    }

    if (totalHits > 0) {
      if (page === 1) {
        successAlert(totalHits);
      }
      page += 1;

      return response.data.hits;
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

function successAlert(hits) {
  Notify.success(`Hooray! We found ${hits} images.`);
}
