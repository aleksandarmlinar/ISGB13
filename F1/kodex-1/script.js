window.addEventListener('load', myFunction);



// https://restcountries.eu/rest/v2/name/sweden
function myFunction(){

    let container = document.getElementById('content');
    let preloader = document.querySelector('#preloader');




    window.fetch('https://restcountries.eu/rest/v2/name/sweden').then(function(response){
        return response.json();
    }).then(function(data){

        let countryData = data[0];
        console.log(countryData);        


        let card = document.createElement('div');
        card.className = 'card';
        card.style.maxWidth = '20rem';
        container.appendChild(card);
    
        let cardImage = document.createElement("img");
        cardImage.className = 'card-img-top';
        cardImage.src = countryData.flag;
        card.appendChild(cardImage);

        let cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        card.appendChild(cardBody);

        let cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.textContent = countryData.name;
        cardBody.appendChild(cardTitle);

        let capital = document.createElement('p');
        capital.className = 'card-text';
        capital.innerHTML = '<b>Capital: </b>' + countryData.capital;
        cardBody.appendChild(capital);

        let area = document.createElement('p');
        area.classList.add('card-text');
        area.innerHTML = '<b>Area: </b>' + countryData.area.toLocaleString() + 'km<sup>2</sup>';
        cardBody.appendChild(area);

        preloader.classList.add('d-none');


    });

}