import { API } from "./js/pixabay-api";
import { markUp } from "./js/markup";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallerylightbox = new SimpleLightbox('.gallery a', { /* options */ });

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const target = document.querySelector('.js-guard');
const api = new API();

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
        } else {
          Notify.success(`Hooray! We found totalHits images: ${photos.totalHits}`);
        }
        
        gallery.insertAdjacentHTML('beforeend', markUp(photos.hits));
        
         document.querySelector(".gallery").firstElementChild.getBoundingClientRect();
       
         window.scrollBy({
          top: 0,
          behavior: "smooth",
});

        observer.observe(target);
        gallerylightbox.refresh();
        
    } catch (error) {
        console.log(error);
    }
} 

function onLoad(event) {
  if (event[0].isIntersecting) {
    api.page += 1;
    morePhotos();
  };

  async function morePhotos() {
    try {
      const resPages = api.page * api.per_page;
      const morePhotos = await api.fetchPhoto();
      gallery.insertAdjacentHTML('beforeend', markUp(morePhotos.hits));
      gallerylightbox.refresh();

      const { height: cardHeight } = document
       .querySelector(".gallery")
       .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
});
      if (resPages > morePhotos.totalHits) {
        Notify.failure("We're sorry, but you've reached the end of search results.");
        observer.unobserve(target);
        return;
      }
    
    } catch (error) {
      console.log(error)
    }

  }
};
  

   





