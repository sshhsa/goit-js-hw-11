import Notiflix, { Notify } from 'notiflix';

const form = document.getElementById('search-form');
const listGallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.js-load');
const buttonSubmit = document.querySelector('.button-submit');
const input = document.querySelector('.input-form');
let currentPage = 1;

// --------- INPUT ---------

input.addEventListener('input', onInputValue);

function onInputValue() {
  if (input.value.trim() !== '') {
    buttonSubmit.removeAttribute('disabled');
  } else {
    buttonSubmit.setAttribute('disabled', true);
  }
}

// --------- BUTTON LOAD MORE ---------

loadMore.addEventListener('click', onClickButtonToLoad);

function onClickButtonToLoad() {
  currentPage += 1;
  getGallery(form.searchQuery.value, currentPage)
    .then(data => {
      listGallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
      if (currentPage >= Math.ceil(data.totalHits / 20)) {
        loadMore.hidden = true;
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(error => console.log(error));
}

// --------- FORM ---------

form.addEventListener('submit', onHandlerClickButton);

function onHandlerClickButton(event) {
  event.preventDefault();
  const { searchQuery } = event.currentTarget.elements;
  currentPage = 1;

  listGallery.innerHTML = '';
  loadMore.hidden = true;

  getGallery(searchQuery.value, currentPage)
    .then(data => {
      if (data.hits.length === 0) {
        Notiflix.Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      } else {
        Notiflix.Notify.success('Success!');
      }

      listGallery.innerHTML = createMarkup(data.hits);

      if (currentPage !== data.totalHits) {
        loadMore.hidden = false;
      }
    })
    .catch(error => console.log(error));
}

// --------- BACKEND ---------

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35838965-00a6ae99c457ac18fcac9dde6';

function getGallery(q, page = 1) {
  const params = new URLSearchParams({
    q: q,
    page,
    per_page: 40,
    safesearch: true,
    orientation: 'horizontal',
    image_type: 'photo',
  });

  return fetch(`${BASE_URL}?key=${API_KEY}&${params}`).then(response => {
    if (!response.ok) {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

// --------- A CREATING THE MARKUP ---------

function createMarkup(array) {
  return array
    .map(
      ({
        tags,
        webformatURL,
        views,
        downloads,
        likes,
        comments,
      }) => `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="320" height="200" class="card-photo"/>
  <div class="info">
    <p class="info-item"><b>Likes</b>${likes}</p>
    <p class="info-item"><b>Views</b>${views}</p>
    <p class="info-item"><b>Comments</b>${comments}</p>
    <p class="info-item"><b>Downloads</b>${downloads}</p>
  </div>
</div>
`
    )
    .join('');
}
