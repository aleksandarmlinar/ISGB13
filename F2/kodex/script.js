'use strict';

window.addEventListener('load', init);


function init(){
    let form = document.querySelector('#search'); 
    form.addEventListener('submit', handleSearchFormSubmit()); 
};


function handleSearchFormSubmit(evt){
    evt.preventDefault()
};






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

