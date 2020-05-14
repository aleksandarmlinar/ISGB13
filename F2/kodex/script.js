/**
 * Makes a request to https://restcountries.eu/rest/v2/name/{query} and displays a table with the results.
 * @param {string} query The user’s search query
 * @param {HTMLElement} container The <tbody> element that the result will be printed to
 */

 window.addEventListener('load', init);

 function init() {
  
  let form = document.querySelector('#search-form');
  form.addEventListener('submit', handleSearchFormSubmit);
 }

 function handleSearchFormSubmit(evt) {
   evt.preventDefault();
   let searchField = document.querySelector('#search');
   let tbody = document.querySelector('#tbody');   
   search(searchField.value, tbody);
 }




function search(query, container) {
  //Ta bort gammalt resultat
  container.innerHTML = '';

  window.fetch('https://restcountries.eu/rest/v2/name/' + encodeURIComponent(query))
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    //console.log(data);
    for(let countryData of data) {
      createTableRow(countryData, container);
    }

  });

}

function createTableRow(countryData, container) {
  let row = document.createElement('tr');
  container.appendChild(row);

  let name = document.createElement('td');
  name.textContent = countryData.name;
  row.appendChild(name);

  let capital = document.createElement('td');
  capital.textContent = countryData.capital;
  row.appendChild(capital);

  let area = document.createElement('td');
  area.className = 'text-right';
  if(countryData.area != null) {
    area.innerHTML = countryData.area.toLocaleString('en') + ' km<sup>2</sup>';
  }
  else {
    area.textContent = 'n/a';
  }
  row.appendChild(area);

  let population = document.createElement('td');
  population.className = 'text-right';
  if(countryData.population != null) {
    population.innerHTML = countryData.population.toLocaleString('en');
  }
  else {
    population.textContent = 'n/a';
  }
  row.appendChild(population);

}
