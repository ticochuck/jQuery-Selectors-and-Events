'use strict';

const keywords = [];

function Gallery(object) {
  this.url = object.image_url;
  this.title = object.title;
  this.description = object.description;
  this.keyword = object.keyword;
  this.horns = object.horns;
}

Gallery.prototype.render = function () {
  let $galleryClone = $('.photo-template').clone();
  $galleryClone.find('h2').text(this.title);
  $galleryClone.find('img').attr('src', this.url);
  $galleryClone.find('img').attr('alt', this.title);
  $galleryClone.find('p').text(this.description);
  $galleryClone.removeClass('photo-template');
  $galleryClone.attr('class', this.keyword);
  $('main').append($galleryClone);
};

function displayImages() {
  let $selected = $(this).val();
  if ($selected === 'default') {
    $('section').fadeIn();
    $('.photo-template').hide();
  } else {
    $('section').hide();
    $('.' + $selected).fadeIn();
  }
}

function appendToSelectMenu(keyword) {
  if (!keywords.includes(keyword)) {
    keywords.push(keyword);
  }
}

function appendToKeywordsArray() {
  keywords.sort();
  for (let i = 0; i < keywords.length; i++) {
    $('select').append(`<option value="${keywords[i]}">${keywords[i]}</option>`);
  }
}

function getData() {
  $.ajax('./data/page-1.json')
  .then(data => {
    data.forEach((object, idx) => {
      let gallery = new Gallery(object);
      gallery.render();    
      appendToSelectMenu(object.keyword);
    })
    appendToKeywordsArray();
  });
}

$(document).ready(function() {
  $('select').on('change', displayImages);
  getData();  
});