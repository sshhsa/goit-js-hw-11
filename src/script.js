const form = document.getElementById('search-form');
const input = document.querySelector('.js-input');
const button = document.querySelector('.js-button');

form.addEventListener('click', onHandlerClickButton);

function onHandlerClickButton(event) {
  event.preventDefault();

  //   const { q } = event.currentTarget.elements;
  //   getGallery(q.value);

  createMarkup();
}

function getGallery(q) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '35838965-00a6ae99c457ac18fcac9dde6';

  return fetch(`${BASE_URL}?key=${API_KEY}&q=${q}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  });
}

function createMarkup(array) {
  return array
    .map(
      ({
        hits: [
          {
            tags,
            webformatURL,
            largeImageURL,
            views,
            downloads,
            likes,
            comments,
          },
        ],
      }) => `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">${likes}<b>Likes</b></p>
    <p class="info-item">${views}<b>Views</b></p>
    <p class="info-item">${comments}<b>Comments</b></p>
    <p class="info-item">${downloads}<b>Downloads</b></p>
  </div>
</div>
`
    )
    .join('');
}
