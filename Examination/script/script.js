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
    var accessToken = 'BQDqUVPNDXQfZ6xTspo54pclqTQifXNzzGMsehpKu0DQWeKrRPZY3NhmkPKK1xAZh7DcJyqO-edes8RKI9GYFKdrbYw12RxyJVoVt5qMQHg3siB9DZHnWz4O5mhhH_tS15eZN4DBy9RmQAps28091fSwaChphrHuFp9eIf898hHTYz5b_7l4gSbtkezptpK3iv1uuPrVw5ViMM1uzT5XlqxwT-rvRWIhPA_MqBIZudxEoR5abcKGbe9nKJmc2UaEgmqpCEBNxRW8ti42Ed28UG4y';    
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
		
		document.querySelector('.wrapper').style.display = 'grid';
		document.querySelector('.content').style.display = 'none';
		var closeBtn = document.querySelector('#closeBtn');

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

            cellRef.addEventListener('click', ()=>{
                document.querySelector('.content').style.display = 'block';
				container.style.display = 'none';
				closeBtn.style.display = 'block';
				detailedSongInfo(songName, artistName);
            })

        };

		closeBtn.addEventListener('click', closePanel);

    };

	function detailedSongInfo(songName, artistName){
		let contentRef= document.querySelector('.content');
		let artistNameRef = document.createElement('h1');
		let songNameRef = document.createElement('h2');

		artistNameRef.textContent = songName;
		songNameRef.textContent = artistName;

		contentRef.appendChild(artistNameRef);
		contentRef.appendChild(songNameRef);

	}

	function closePanel(){
		document.querySelector('.content').style.display = 'none';
		document.querySelector('.wrapper').style.display = 'grid';
		document.querySelector('#closeBtn').style.display = 'none';
		document.querySelector('.content').innerHTML = '';
	}
