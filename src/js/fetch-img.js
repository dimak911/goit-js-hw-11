import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
const BASE_URL = 'https://pixabay.com/';

export async function getImage(query) {
  try {
    const response = await axios.get(`${BASE_URL}api/`, {
      params: {
        key: '28213280-eb811a12977e7e61e372ebe76',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
      },
    });

    const totalHits = response.data.totalHits;

    if (totalHits > 0) {
      successAlert(totalHits);
      return response.data.hits;
    } else {
      throw new Error();
    }
  } catch {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

function successAlert(hits) {
  Notify.success(`Hooray! We found ${hits} images.`);
}
