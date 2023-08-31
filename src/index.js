import { fetchPhoto } from "./js/pixabay-api";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallerylightbox = new SimpleLightbox('.gallery a', { /* options */ });

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const target = document.querySelector('.js-guard');
let currentPage = 1;

form.addEventListener('submit', onSubmit);

let options = {
  root: null,
  rootMargin: "300px",
  threshold: 1.0,
};


// let observer = new IntersectionObserver(onLoad, options);
function onSubmit(event) {
    event.preventDefault();
    gallery.innerHTML = '';
    const search = form.searchQuery.value.trim().toLowerCase();
    loadPhotos(search);
}

// function onLoad(entnpm startries, observer) {
//   entries.forEach(async (entry) => {
//     if (entry.isIntersecting)
//       currentPage += 1;
//     loadPhotos(q, currentPage);
//   }
//   )}





   async function loadPhotos(q, page){   
      try {
      
        const photos = await fetchPhoto(q);

        if (!(photos.hits.length)) {
            Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return;
        }
      console.log(photos.hits)
      
      gallery.insertAdjacentHTML('beforeend', markUp(photos.hits))
      
    } catch (error) {
        console.log(error);
    }
} 
   
function markUp(photos) {
    return photos.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `<a href="${largeImageURL}"><div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
</div></a>`).join(' ');
}


