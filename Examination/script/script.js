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
    var accessToken = 'BQB5hBpygPmqX0OMavWNM-zWGR3rUBYhEB1_9UtJJtruPboSCkub-Afijqi80a4BXY_H5JVdvqdn0Y5T8GX1cXFzfAA3g6EdlQP1pwfZhLn7roeUKOw2Tng3rAGJuVgi1IEbIIrRoOmWIgRCCyaowMwdN2Cuxn3YQp9QWnBg50ZYh4vJFWL54-_04TmldshqsSdkoCyp4Buysjt51KK8huQEFqe6A0NisWXQaZxU2_O-Z1PgfUmi_5t1KIzwK9rHtzr791HmaIX85r0q2Zh1fIvy';    
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

	//lyrics api
	//http://api.chartlyrics.com/apiv1.asmx/SearchLyric?artist=string&song=string
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

};

    function createGridCell(musicData, container){
		
		document.querySelector('.wrapper').style.display = 'grid';
		document.querySelector('.content').style.display = 'none';
		document.querySelector('#closeBtn').style.display = 'none';
		
		var closeBtn = document.querySelector('#closeBtn');

        for(let i= 0; i < musicData.items.length; i++){
            
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
                document.querySelector('.content').style.display = 'block';
				container.style.display = 'none';
				closeBtn.style.display = 'block';
				detailedSongInfo(infoData);
            })

        };

		closeBtn.addEventListener('click', closePanel);

    };

	function detailedSongInfo(infoData){
		
		let contentRef = document.querySelector('.content');
		let artistNameRef = document.createElement('h1');
		let songNameRef = document.createElement('h3');
		let previewSongRef = document.createElement('div');
		let imageCoverRef = document.createElement('img');
		
		artistNameRef.textContent = infoData.artistname;
		contentRef.appendChild(artistNameRef);
		
		songNameRef.textContent = infoData.songname;
		contentRef.appendChild(songNameRef);
		
		imageCoverRef.setAttribute('src', infoData.imagecover);
		contentRef.appendChild(imageCoverRef);
		
		previewSongRef.innerHTML = "<iframe src=" + infoData.previewurl + "></iframe>";
		contentRef.appendChild(previewSongRef);
		

		
	}

	function closePanel(){
		document.querySelector('.content').style.display = 'none';
		document.querySelector('.wrapper').style.display = 'grid';
		document.querySelector('#closeBtn').style.display = 'none';
		document.querySelector('.content').innerHTML = '';
	}
