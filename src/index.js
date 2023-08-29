import { fetchPhoto } from "./js/pixabay-api";


const form = document.querySelector('.search-form');

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
    event.preventDefault();
    const search = form.searchQuery.value.trim().toLowerCase();
    fetchPhoto(search);
}
