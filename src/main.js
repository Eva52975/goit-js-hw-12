import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { findImage } from './js/pixabay-api';
import { renderElement, loadMore, page } from './js/render-functions';
import { imgGallery } from './js/render-functions';
import { showLoader } from './js/render-functions';
import { hideLoader } from './js/render-functions';

const form = document.querySelector('.form');
const input = document.querySelector('input[name = "value"]');
export const gallery = document.querySelector('.gallery');
export const btnLoad = document.querySelector('.btn-load-more');

btnLoad.style.display = 'none';
hideLoader();
export let inputValue = '';

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
    if (images.length > 14) {
      btnLoad.style.display = 'block';
    }
  } catch (err) {
    console.log(err);
  } finally {
    hideLoader();
  }
});

// ========================

export let limit = 15;

export const totalPages = Math.ceil(500 / limit);

btnLoad.addEventListener('click', async e => {
  e.preventDefault();
  loadMore(page, totalPages, btnLoad, inputValue);
});

// btnLoad.addEventListener('click', async function loadMore() {
//   if (page >= totalPages) {
//     btnLoad.style.display = 'none';
//     return iziToast.error({
//       position: 'topRight',
//       message: "We're sorry, there are no more posts to load",
//     });
//   }
//   page += 1;
//   try {
//     const posts = await findImage(inputValue, page);
//     console.log(posts);
//     if (posts.length === 0) {
//       btnLoad.style.display = 'none';
//     }
//     gallery.insertAdjacentHTML('beforeend', renderElement(posts));
//     imgGallery();

//     if (page > 1) {
//       btnLoad.style.display = 'block';
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });
