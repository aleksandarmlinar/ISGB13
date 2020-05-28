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
    var accessToken = 'BQBri9fGiEVgBgBAL6I94l5DgebZTzZlqX8rkkisicvFacgBXakU1Z00l_JW9e9lGi_hPOfEziHpDrsH37Pt1DOM_oDwLuF5AabyCnNYN7WduieW1QDktISp3bMZcCrf5QK1LFGFuqc6HXqeF7585bgXVlrnwuJa5BygNe7s5X7eIHxia8JblqSumXpmR9fYNDn8a1bW9L5ohCDLOovXOXttA7u5YcFVzLHVID9-96CcAr1FJTa0IdXp6lMMLv1WNgN0uqK46dOtIIxQPqVkqZeP';    
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
