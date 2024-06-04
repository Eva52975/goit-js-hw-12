import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { findImage, currentQuery } from './pixabay-api';
import { gallery, btnLoad } from '../main';

export function renderElement(arr) {
  return arr
    .map(
      item => `<li class="element-gallery">
      <a class="gallery-link" href="${item.largeImageURL}">
    <img class="img-gallery" src="${item.webformatURL}" alt="${item.tags}">
    <ul class="list-info">
    <li class="item-info"><h3 class="title-text">Likes</h3>
    <p class="text">${item.likes}</p></li>
    <li class="item-info"><h3 class="title-text">Views</h3>
    <p class="text">${item.views}</p></li>
    <li class="item-info"><h3 class="title-text">Comments</h3>
    <p class="text">${item.comments}</p></li>
    <li class="item-info"><h3 class="title-text">Downloads</h3>
    <p class="text">${item.downloads}</p></li>
   </ul>
  </li>`
    )
    .join('');
}

export function imgGallery() {
  const lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionsData: 'alt',
  });
  lightbox.refresh();
}

export function showLoader() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'block';
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'none';
}

// ====================================
export let page = 1;

export async function loadMore(page, totalPages, btnLoad, inputValue) {
  if (page >= totalPages) {
    btnLoad.style.display = 'none';
    return iziToast.error({
      position: 'topRight',
      message: "We're sorry, there are no more posts to load",
    });
  }
  page += 1;
  try {
    const posts = await findImage(inputValue, page);
    console.log(posts);
    if (posts.length === 0) {
      btnLoad.style.display = 'none';
    }
    gallery.insertAdjacentHTML('beforeend', renderElement(posts));
    imgGallery();

    if (page > 1) {
      btnLoad.style.display = 'block';
    }
  } catch (error) {
    console.log(error);
  }
}
