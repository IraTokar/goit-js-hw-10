import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';
import {fetchBreeds,fetchCatByBreed} from './cat-api';

const elements = {
    selectEl: document.querySelector('.breed-select'),
    loaderEl: document.querySelector('.loader'),
    errorEl: document.querySelector('.error'),
    catInfo: document.querySelector('.cat-info'),
}

const { selectEl, loaderEl, errorEl, catInfo } = elements;

catInfo.classList.add('is-hidden');

selectEl.addEventListener('change', createMarkUp);

updateSelect()


function updateSelect(data) {
    fetchBreeds(data)
        .then(data => {
            loaderEl.classList.replace('loader', 'is-hidden');
        
            let markSelect = data.map(({ name, id }) => {
                return `<option value = '${id}'>${name}</option>`;
            });
    
            selectEl.insertAdjacentHTML('beforeend', markSelect);
            new SlimSelect({
                select: selectEl,
            });
        }).catch(onFetchError);
};


function createMarkUp(evt) {
    loaderEl.classList.replace('is-hidden','loader');
    catInfo.classList.add('is-hidden');
    selectEl.classList.add('is-hidden');

    const breedId = evt.currentTarget.value;

    fetchCatByBreed(breedId)
        .then(data => {
            loaderEl.classList.replace('loader', 'is-hidden');
            selectEl.classList.remove('is-hidden');
    
            const { url, breeds } = data[0];
            catInfo.innerHTML = `<img src="${url}" alt="${breeds[0].name}" width="400"/><div class="box"><h2>${breeds[0].name}</h2><p>${breeds[0].description}</p><p><strong>Temperament:</strong> ${breeds[0].temperament}</p></div>`;
            catInfo.classList.remove('is-hidden');
        })
    .catch(onFetchError)
}




function onFetchError() {
    selectEl.classList.remove('is-hidden');
    loaderEl.classList.replace('loader', 'is-hidden');

    Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!') 
};

function onFetchError() {
  selectEl.classList.remove('is-hidden');
  loaderEl.classList.replace('loader', 'is-hidden');

  Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!'
  );
}





