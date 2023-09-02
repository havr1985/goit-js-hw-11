import axios from 'axios';

export class API {
  URL = 'https://pixabay.com/api/';
  KEY = '39126607-3ae5cf154c5ca3fc6757e3d2b';
  q = null;
  page = 1;
  per_page = 40;

  async fetchPhoto() {
    const response = await axios.get(`${this.URL}?key=${this.KEY}&q=${this.q}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.per_page}`);
    const data = response.data;
    return data;
  } 
}
