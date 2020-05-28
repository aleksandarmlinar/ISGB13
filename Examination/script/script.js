'use strict'
//lyssnare för hela sidan
window.addEventListener('load', init);

function init(){

    let form = document.querySelector("#search-form");
    form.addEventListener('submit', hanteraSokForm);

};

function hanteraSokForm(evt){
    evt.preventDefault();

    let searchField = document.querySelector('#search');
    let gridRef = document.querySelector('.wrapper');
    
    search(searchField.value, gridRef)
};


function search(query, container){
    //Tömmer rutan på gammalt resultat
    container.innerHTML = '';

	//spotify api //
    var accessToken = 'BQA2he3o0O7Lmbe5vhxzuVcdXQmuwmrdAPikT-2sNOPGSvlD5iIviL0wiZ-kAzOXnXnKkPS6EgxwpFuGMQyJwDCw8LqMPN7YhOLyG_vbAVLYKmDLyHZgwsO8ZVQkbwZWN59JaWlzrt5vdG0-PdB_Z8-xwfoI6tIWMfVurJOkyin854geeO2gzKqfBYTT7TzYq5KZaORhC8iyKmALSbc8KnEC4ImGZU0gRnwjn9txoIx1HhuvkwJqEZ5iLfA5i8cw7S2j9CqDUyMoAD214iB6iDsb';    
    window.fetch('https://api.spotify.com/v1/search?limit=50&q=' + encodeURIComponent(query) + '&type=track', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        })
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        //console.log(data.tracks.items[1].artists[0].name);
        
        let dataRef = Object.values(data);
        for(let musicData of dataRef){
            console.log(musicData);
            console.log(musicData.items[0].name);   
            createGridCell(musicData, container);
       
        };
    });

};

    function createGridCell(musicData, container){


        for(let i= 0; i < musicData.items.length; i++){
            let cellRef = document.createElement('div');
            let cellRefAttr = document.createAttribute('class');
           
            cellRefAttr.value = 'cell';
            cellRef.setAttributeNode(cellRefAttr);
            cellRef.setAttribute('style', 'background-image: url(' + '"' + musicData.items[i].album.images[0].url + '"); background-size: cover;');
            
            let artistRef = document.createElement('h2');
            let nameRef = document.createElement('h5');


            let songName = musicData.items[i].name;
            let artistName = musicData.items[i].artists[0].name;


            nameRef.innerHTML= songName;
            artistRef.innerHTML = artistName;

            container.appendChild(cellRef);
            cellRef.appendChild(artistRef);
            cellRef.appendChild(nameRef);

            cellRef.addEventListener('click', (e)=>{
                document.querySelector('.content').style.opacity = '1';
                document.querySelector('.content').style.height = '1000px';
            })

        };

    };