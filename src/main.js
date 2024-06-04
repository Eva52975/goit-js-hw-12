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
let limit = 15;
const totalPages = Math.ceil(500 / limit);

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
    if (images.length === 0) {
      btnLoad.style.display = 'none';
    }
    const markup = renderElement(images);
    gallery.insertAdjacentHTML('beforeend', markup);
    imgGallery();
    if (images.length > 15) {
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
  if (page >= totalPages) {
    btnLoad.style.display = 'none';
    iziToast.error({
      position: 'topRight',
      message: "We're sorry, there are no more posts to load",
    });
    return;
  }
  page += 1;
  try {
    const posts = await findImage(inputValue, page);
    console.log(posts);
    gallery.insertAdjacentHTML('beforeend', renderElement(posts));
    imgGallery();

    if (page > 1) {
      btnLoad.style.display = 'block';
    }
  } catch (error) {
    console.log(error);
  }
});
