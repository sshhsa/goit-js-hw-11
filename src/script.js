const form = document.getElementById('search-form');
const input = document.querySelector('.js-input');
const button = document.querySelector('.js-button');
const listGallery = document.querySelector('.gallery');

form.addEventListener('submit', onHandlerClickButton);

function onHandlerClickButton(event) {
  event.preventDefault();
  const { searchQuery } = event.currentTarget.elements;

  getGallery(searchQuery.value)
    .then(data => (listGallery.innerHTML = createMarkup(data.hits)))
    .then(data =>
      listGallery.insertAdjacentHTML(
        'afterend',
        '<div class="container-button"><button class="load-more">LOAD MORE</button></div>'
      )
    )
    .catch(error => console.log(error));
}

function getGallery(q) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '35838965-00a6ae99c457ac18fcac9dde6';

  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
      console.log(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    return response.json();
  });
}

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
