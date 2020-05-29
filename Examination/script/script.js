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
    document.querySelector('.content').style.display = 'none';


	//spotify api - hämta Json Data och skicka det vidare till funktionen createGridCell bearbetar den.
    var accessToken = 'BQCwEUbUJgJcupK5HFQkfuT4ALj0DliDRNek_dnjqKf2BqoVyJw_kvyeQdg8ZlK81AUsswoWA_bevh5Jflok7VVdR-m_fUgeQ4MKt8xmLFG8Hcvm7eCSZbfTcac1zzicIlybtgmm9ZF4REAeFDv3NjunqDCybg_GRA4_OjfVyIP8BJ2zUT_EgCdtLwuDEncWAV8lz2TkvJyQtQ0qFXJ-KeTtqtngrCLbZhGZUnSySZCQRy9BATsWbmPGvDinu1x-fl698IbNiPkgXf03w_Vk1Mlq';    
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
            createGridCell(musicData, container);
       
        };
    });

        // function searchLyrics(artist){

        //         // hämta låttexter
        //         window.fetch('https://cors-anywhere.herokuapp.com/http://api.chartlyrics.com/apiv1.asmx/SearchLyricDirect?artist='+artist+'&song='+encodeURIComponent(query))
        //         .then(response => response.text())
        //         .then(lyricsData);
        //         //console.log(lyricsData);
        // }




};


function createGridCell(musicData, container){
    
    document.querySelector('.wrapper').style.display = 'grid';
    document.querySelector('.content').style.display = 'none';
    document.querySelector('#closeBtn').style.display = 'none';
    
    var closeBtn = document.querySelector('#closeBtn');

    for(let i= 0; i < musicData.items.length; i++) {
        
        // Skapa en ruta som vi sen fyller med info från sökfältet.
        let cellRef = document.createElement('div');
        let cellRefAttr = document.createAttribute('class');
        cellRefAttr.value = 'cell';
        cellRef.setAttributeNode(cellRefAttr);
        cellRef.setAttribute('style', 'background-image: url(' + '"' + musicData.items[i].album.images[0].url + '"); background-size: cover;');
        
        let artistRef = document.createElement('h2');
        let nameRef = document.createElement('h5');
        let previewRef = document.createElement('div');


        let songName = musicData.items[i].name;
        let artistName = musicData.items[i].artists[0].name;
        let previewUrl = musicData.items[i].preview_url;
        let imageCover = musicData.items[i].album.images[1].url;

        let infoData = {

            songname: songName,
            artistname: artistName,
            previewurl: previewUrl,
            imagecover: imageCover
        };


        nameRef.textContent = songName;
        artistRef.textContent = artistName;
        previewRef.innerHTML = "<iframe src=" + previewUrl + "></iframe>";
        

        container.appendChild(cellRef);
        cellRef.appendChild(artistRef);
        cellRef.appendChild(nameRef);
        //cellRef.appendChild(previewRef);

        cellRef.addEventListener('click', ()=>{
            document.querySelector('.content').style.display = 'grid';
            container.style.display = 'none';
            closeBtn.style.display = 'block';
            detailedSongInfo(infoData);
            searchLyrics(infoData);
        })

    };

    closeBtn.addEventListener('click', closePanel);

};

function detailedSongInfo(infoData){
    
    let contentRef = document.querySelector('.content');
    let cellOneRef = document.createElement('div');
    cellOneRef.setAttribute('class', 'cell-1');
    
    let artistNameRef = document.createElement('h1');
    let songNameRef = document.createElement('h3');
    let previewSongRef = document.createElement('div');
    previewSongRef.setAttribute('class', 'no-song-info');
    let imageCoverRef = document.createElement('img');
    
    artistNameRef.textContent = infoData.artistname;
    cellOneRef.appendChild(artistNameRef);
    
    songNameRef.textContent = infoData.songname;
    cellOneRef.appendChild(songNameRef);
    
    imageCoverRef.setAttribute('src', infoData.imagecover);
    cellOneRef.appendChild(imageCoverRef);
    
    
    //Kontrollera om förhandsvisning för låten finns, om inte, skriv ett meddelande till användaren.
    if(infoData.previewurl != null){
        previewSongRef.removeAttribute('class', 'no-song-info');
        previewSongRef.innerHTML = "<iframe src=" + infoData.previewurl + "></iframe>";

    } else {
        previewSongRef.textContent = "Unfortunately we don't have an audio  preview for this song.";
    }   
    cellOneRef.appendChild(previewSongRef);  
    contentRef.appendChild(cellOneRef);
    
    
}

function closePanel(){
    document.querySelector('.content').style.display = 'none';
    document.querySelector('.wrapper').style.display = 'grid';
    document.querySelector('#closeBtn').style.display = 'none';
    document.querySelector('.content').innerHTML = '';
}
    

function searchLyrics(infoData){
    console.log(infoData);
    // hämta låttexter
    window.fetch('https://cors-anywhere.herokuapp.com/http://api.chartlyrics.com/apiv1.asmx/SearchLyricDirect?artist='+infoData.artistname+'&song='+ infoData.songname)
    .then(response => response.text())
    .then(lyricsData);
    //console.log(lyricsData);
}

    
function lyricsData(xmlString){
    console.log('Handle funkar');
    
    let parser = new window.DOMParser();
    let xmlDOM = parser.parseFromString(xmlString, 'application/xml');
    console.log(xmlDOM);


    // Skapa element för att lägga in låttexter
    let contentRef = document.querySelector('.content');
    let cellTwoRef = document.createElement('div');
    let lyricsHeader = document.createElement('h1');
    cellTwoRef.setAttribute('class', 'cell-2');
    let pRef = document.createElement('p');

    let songRef = xmlDOM.querySelector('Lyric');
    let headerRef = xmlDOM.querySelector('LyricSong');

    
    contentRef.appendChild(cellTwoRef);
    cellTwoRef.appendChild(lyricsHeader);
    lyricsHeader.appendChild(headerRef);
    cellTwoRef.appendChild(pRef);
    
    
    if(songRef.textContent != '') {
         pRef.appendChild(songRef);
    } 
    else {
        pRef.textContent = 'Lyrics for this song are not available.'
    }
}
