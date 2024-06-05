import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { findImage } from './js/pixabay-api';
import {
  renderElement,
  imgGallery,
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
let page = 1;

form.addEventListener('submit', async e => {
  e.preventDefault();
  gallery.innerHTML = '';
  inputValue = input.value.trim();
  if (inputValue === '') {
    return;
  }

  input.value = '';
  showLoader();

  try {
    const images = await findImage(inputValue, page);
    if (!images || images.length === 0) {
      btnLoad.style.display = 'none';
      return;
    }
    const markup = renderElement(images);
    gallery.insertAdjacentHTML('beforeend', markup);
    imgGallery();
    if (images.length >= 15) {
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

btnLoad.addEventListener('click', async () => {
  page += 1;
  showLoader();
  try {
    const posts = await findImage(inputValue, page);

    if (!posts || posts.length === 0) {
      hideLoader();
      iziToast.error({
        position: 'topRight',
        message: "We're sorry, there are no more posts to load",
      });
      btnLoad.style.display = 'none';
      return;
    }
    gallery.insertAdjacentHTML('beforeend', renderElement(posts));
    imgGallery();

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
