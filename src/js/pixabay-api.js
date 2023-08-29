import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const KEY = '39126607-3ae5cf154c5ca3fc6757e3d2b';

export async function fetchPhoto(q) {
  try {
    const response = await axios.get(`${URL}?key=${KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true`);
    console.log(response);
  } catch (error) {
    console.error(error);
    }

}