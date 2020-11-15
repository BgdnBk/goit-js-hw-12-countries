import countryCard from '../templates/block-countries.hbs';
import countryList from '../templates/list-country.hbs';
import ApiCountry from './api-servise';
import getRefs from './get-refs';
import { error } from './error';
const debounce = require('lodash.debounce');

const refs = getRefs();
const apiCountry = new ApiCountry();

refs.onSearch.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault()
   clearContainer();
  if (e.target.value.length < 1) {
    return;
  }

  apiCountry.countryName = e.target.value;

  apiCountry.fetchCountry()
    .then(markupCard)
    .catch(onError)
  }

function markupCard(country) {
   if (country.length === 1) {
    createMarkupCard(country);
  } else if (country.length > 1 && country.length <= 10) {
    createMarkupList(country);
  } else if (country.length > 10) {
    error({
      title: 'Too many matches found. Please enter a more specific query!',
      delay: 2000,
    });
  }
}

function createMarkupCard(country) {
  const markup = countryCard(country);
  refs.cardCountry.insertAdjacentHTML('beforeend', markup);
}

function createMarkupList(country) {
  const markup = countryList(country);
  refs.cardCountry.insertAdjacentHTML('beforeend', markup);
}

function clearContainer() {
  refs.cardCountry.innerHTML = ' ';
}

function onError(error) {
  alert('Проверте вводные данные');
}


