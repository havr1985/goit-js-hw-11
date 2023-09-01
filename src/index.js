import { API } from "./js/pixabay-api";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallerylightbox = new SimpleLightbox('.gallery a', { /* options */ });

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const target = document.querySelector('.js-guard');
const api = new API;

let currentPage = 1;

form.addEventListener('submit', onSubmit);

let options = {
  root: null,
  rootMargin: "200px",
  threshold: 1.0,
};


function onSubmit(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  const search = form.searchQuery.value.trim().toLowerCase();
  api.q = search;
  api.page = 1;
  loadPhotos();
};


let observer = new IntersectionObserver(onLoad, options);

   async function loadPhotos(){   
      try {
        const photos = await api.fetchPhoto();

        if (!(photos.hits.length)) {
            Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return;
        }
        console.log(photos);
        
        gallery.insertAdjacentHTML('beforeend', markUp(photos.hits))
        
        observer.observe(target);
        gallerylightbox.refresh();
    } catch (error) {
        console.log(error);
    }
} 

function onLoad(event) {
  if (event[0].isIntersecting) {
    currentPage += 1;
    console.log(currentPage)
    morePhotos();
    
  };

  async function morePhotos() {
    try {
      // const resPages = photos.page * 40;
      const morePhotos = await api.fetchPhoto();
      gallery.insertAdjacentHTML('beforeend', markUp(morePhotos.hits));
      gallerylightbox.refresh();
    
    
    } catch (error) {
      console.log(error)
    }

  }
  }
   
function markUp(photos) {
    return photos.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `<div class="photo-card">
  <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>`).join(' ');
}




