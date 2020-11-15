export default class CountryApi { 
  constructor() { 
    this.countryName = '';
  }

  fetchCountry() {
  const url = `https://restcountries.eu/rest/v2/name/${this.countryName}`;
    return fetch(url).then(response => {
      return response.json();
  })    
    
  } 

  get country() { 
    return this.countryName;
  }

  set country(newCountry) { 
    this.countryName = newCountry;
  }
}