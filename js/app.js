'use strict';

const keywords = [];
const newData = [];

function Gallery(url, title, description, keyword, horn) {
  this.url = url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horn = horn;
  newData.push(this.keyword);
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
  // $('.photo-template').remove();
};


$(document).ready(function() {

$('select').on('change', displayImages);

function displayImages() {
  let selected = $(this).val();
  console.log(selected);
  if (selected === 'default') {
    $('section').fadeIn();
    $('.photo-template').fadeOut();
  } else {
    $('section').fadeOut();
    $('.' + selected).fadeIn();
  }
}
$.ajax('/data/page-1.json')
  .then(data => {
    data.forEach((object, idx) => {
      let gallery = new Gallery(object.image_url, object.title, object.description, object.keyword, object.horns);
      gallery.render();

      if (!keywords.includes(object.keyword)) {
        keywords.push(object.keyword);
      }
    })
    keywords.sort();
    for (let i = 0; i < keywords.length; i++) {
      $('select').append(`<option value="${keywords[i]}">${keywords[i]}</option>`);
    }      
  });
});