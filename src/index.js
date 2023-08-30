import { fetchPhoto } from "./js/pixabay-api";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery')

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
    event.preventDefault();
    gallery.innerHTML = '';
    const search = form.searchQuery.value.trim().toLowerCase();
    creatPhotos(search);
}

async function creatPhotos(q) {
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
    return photos.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `<div class="photo-card">
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
</div>`).join(' ');
}


