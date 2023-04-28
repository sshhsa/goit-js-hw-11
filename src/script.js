const form = document.getElementById('search-form');
const input = document.querySelector('.js-input');
const button = document.querySelector('.js-button');
const listGallery = document.querySelector('.gallery');

// function createMarkup(array) {
//   return array
//     .map(
//       ({
//         hits: [
//           {
//             tags,
//             webformatURL,
//             largeImageURL,
//             views,
//             downloads,
//             likes,
//             comments,
//           },
//         ],
//       }) => `<div class="photo-card">
//   <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">${likes}<b>Likes</b></p>
//     <p class="info-item">${views}<b>Views</b></p>
//     <p class="info-item">${comments}<b>Comments</b></p>
//     <p class="info-item">${downloads}<b>Downloads</b></p>
//   </div>
// </div>
// `
//     )
//     .join('');
// }

////////////////////////////////////////////////////////////////////////////////////////

form.addEventListener('submit', onHandlerClickButton);

function onHandlerClickButton(event) {
  event.preventDefault();
  const { searchQuery } = event.currentTarget.elements;

  getGallery(searchQuery.value)
    .then(data => console.log(typeof data))
    .catch(error => console.log(error));
}

function getGallery(q) {
  const BASE_URL = 'https://pixabay.com/api';
  const API_KEY = '35838965-00a6ae99c457ac18fcac9dde6';

  return fetch(
    `${BASE_URL}/?key=${API_KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(response => {
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
