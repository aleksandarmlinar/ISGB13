'use strict';
//https://www3.kau.se/tentamenslista/rss.xml

window.addEventListener('load', () => {
    window.fetch('https://cors-anywhere.herokuapp.com/https://www3.kau.se/tentamenslista/rss.xml')
        .then(response => response.text())
        .then(handleData);
});

function handleData(xmlString){
    
    let parser = new window.DOMParser();
    let xmlDOM = parser.parseFromString(xmlString, 'application/xml');

    console.log(xmlDOM);

    let ul = document.createElement('ul');
    ul.className = 'list-group';
    document.querySelector('#container').appendChild(ul);

    let items = xmlDOM.querySelectorAll('item');

    items.forEach(item => {
        let title = item.querySelector('title').textContent;
        let description = item.querySelector('description').textContent;

        let li = document.createElement('li');
        li.className = 'list-group-item';
        ul.appendChild(li);

        let titleNode = document.createElement('h5');
        titleNode.textContent = title;
        li.appendChild(titleNode);

        descriptionNode = document.createElement('div');
        descriptionNode.textContent = description;
        li.appendChild(descriptionNode);

    });

}