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
    let gridRef = document.querySelector('#wrapper');
    
    search(searchField.value, gridRef)
};


function search(query, container){
    //Tömmer rutan på gammalt resultat
    container.innerHTML = '';

    window.fetch('http://ws.audioscrobbler.com/2.0/?method=track.search&track='+encodeURIComponent(query)+'&limit=40&api_key=3293cc390d016447ace4254e0e32696b&format=json')
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        console.log(data);
        let datan = Object.values(data);
        for (let musicData of datan){ //kolla upp detta ordentligt! :)
            createGridCell(musicData, container);
        //console.log(musicData.trackmatches.track[1].name);

        
        };
    });
    


    function createGridCell(musicData, container){
            //container.appendChild(wrapper);
        
        for(let i= 0; i < musicData.trackmatches.track.length; i++){
            let cellRef = document.createElement('div');
            let cellRefAttr = document.createAttribute('class');
            cellRefAttr.value = 'cell';
            cellRef.setAttributeNode(cellRefAttr);
            let nameRef = document.createElement('h5');
            let urlRef = document.createElement('h6');
            let imgRef = document.createElement('IMG');
            imgRef.setAttribute("width", "304");
            imgRef.setAttribute("height", "228");

            let songName = musicData.trackmatches.track[i].name;
            let songUrl = musicData.trackmatches.track[i].url;
            let imgUrl = musicData.trackmatches.track[i].image[3]['#text'];
            imgRef.setAttribute("src", imgUrl);
            //console.log(imgUrl);
            nameRef.innerHTML= songName; 
            urlRef.innerHTML = "<a href =" + '"' + songUrl +'" target="_blank"' + ">" + 'Klicka här' + "</a>";
            //imgRef.innerHTML = "<img src=" + imgUrl + ">";
            // songName = musicData.trackmatches.track[i].name;
            //namn.innerHTML = "<a href =" + '"' + songUrl +'" target="_blank"' + "></a>";
            container.appendChild(cellRef);
            cellRef.appendChild(nameRef);
            cellRef.appendChild(urlRef);
            cellRef.appendChild(imgRef);

        };

    };
   
   
   
   
   
   
   
   
   
   
   
    /*// hämta länken, när vi får ett resultat så har vi ngt att jobba med.
    //music api: 3293cc390d016447ace4254e0e32696b
    window.fetch('http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=3293cc390d016447ace4254e0e32696b&format=json').then((response)=>{
        //console.log(response);
        return response.json();
    }).then ((data) =>{
        console.log(data);  
    });
    */

};