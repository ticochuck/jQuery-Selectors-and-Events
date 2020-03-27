'use strict'

const keywords = [];
const newData = [];

function newData2(url, title, description, keyword, horn) {
  this.url = url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horn = horn;
  newData.push(this);
}

$(document).ready(function() {

$('option').on('click', displayImages);

function displayImages() {
  $('h2').fadeIn();
}



$.ajax('/data/page-1.json')
  .then(data => {
    data.forEach((object, idx) => {
      
      // newData.push(object);
      new newData2(object.image_url, object.title, object.description, object.keyword, object.horns);
      
      $('#photo-template').append(`<div> <h2>${object.title}</h2>, <img src="${object.image_url}">, <br> <span>${object.description}</span> <br> <span> ${object.keyword}</span></div>` );
      
      if (keywords.includes(object.keyword)) {
        // console.log(keywords);  
      } else {
        keywords.push(object.keyword);
      }
    })
    for (let i = 0; i < keywords.length; i++) {

      $('select').append(`<option value="${keywords[i]}">${keywords[i]}</option>`);
    }      
  });
});

console.log(newData);

