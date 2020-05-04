window.addEventListener('load', myFunction);



// https://restcountries.eu/rest/v2/name/sweden

function myFunction(){

    
    let container = document.querySelector('#content');
    let preloader = document.querySelector('#preloader');
    
    
    window.fetch('https://restcountries.eu/rest/v2/name/sweden')
        .then(function(response){
            return response.json();
        }).then(function(data){
            //console.log(data);
            let countryData = data[0];

            let card = document.createElement('div');
            card.className = 'card';
            card.style.maxWidth = '20rem';
            container.appendChild(card);


            let cardImage = document.createElement('img');
            cardImage.className = 'card-img-top';
            cardImage.src = countryData.flag;
            card.appendChild(cardImage);
            
        });


};   