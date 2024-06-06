import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export async function findImage(inputValue, page) {
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/';
  const params = new URLSearchParams({
    key: '44054875-23597af336816bebd19227040',
    q: inputValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: page,
  });

  try {
    const { data } = await axios(`${BASE_URL}${END_POINT}?${params}`);
    return data.hits;
  } catch (error) {
    console.error(error.message);
  }
}
