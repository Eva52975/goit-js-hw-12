import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { findImage } from './js/pixabay-api';
import {
  renderElement,
  imgGallery,
  updateImgGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

const form = document.querySelector('.form');
const input = document.querySelector('input[name = "value"]');
const gallery = document.querySelector('.gallery');
const btnLoad = document.querySelector('.btn-load-more');

btnLoad.style.display = 'none';
hideLoader();
let inputValue = '';

form.addEventListener('submit', async e => {
  e.preventDefault();

  inputValue = input.value.trim();
  if (!inputValue) {
    iziToast.error({
      message: 'Please enter a search query!',
    });
    return;
  }
  gallery.innerHTML = '';
  input.value = '';
  showLoader();

  try {
    const { hits, totalHits } = await findImage(inputValue, (page = 1));
    if (!totalHits || totalHits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      btnLoad.style.display = 'none';
      return;
    }
    const markup = renderElement(hits);
    gallery.insertAdjacentHTML('beforeend', markup);
    imgGallery();
    if (totalHits > 15) {
      btnLoad.style.display = 'block';
    } else {
      btnLoad.style.display = 'none';
    }
  } catch (err) {
    console.log(err);
  } finally {
    hideLoader();
  }
});

// ========================
let page = 1;
btnLoad.addEventListener('click', async () => {
  page += 1;
  showLoader();
  try {
    const { hits } = await findImage(inputValue, page);

    if (!hits || hits.length === 0) {
      hideLoader();
      iziToast.error({
        position: 'topRight',
        message: "We're sorry, there are no more posts to load",
      });
      btnLoad.style.display = 'none';
      return;
    }
    gallery.insertAdjacentHTML('beforeend', renderElement(hits));
    updateImgGallery();

    const lastCard = gallery.lastElementChild;
    const cardHeight = lastCard.getBoundingClientRect().height;

    window.scrollBy({
      left: 0,
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
});
