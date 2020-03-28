'use strict';

const keywords = [];

function Creature(object) {
  this.url = object.image_url;
  this.title = object.title;
  this.description = object.description;
  this.keyword = object.keyword;
  this.horns = object.horns;
}

function displayImages() {
  let $selected = $(this).val();
  if ($selected === 'default') {
    $('section').fadeIn();
  } 
  else {
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

function renderCreatures(object, sourceID, target) {
  let $target = $(target);
  let templateMarkUp = $(sourceID).html();
  let newMarkup = Mustache.render(templateMarkUp, object)
  $target.append(newMarkup);
}

function getData() {
  $.ajax('data/page-1.json')
  .then(data => {
    data.forEach((object, idx) => {
      let gallery = new Creature(object);
      // gallery.render();
      renderCreatures(gallery, "#page-1-template", ".targets");
      // renderCreatures(gallery, "#page-2-template", ".targets");
      appendToSelectMenu(object.keyword);
    })
    appendToKeywordsArray();
  });
}

$(document).ready(function() {
  $('select').on('change', displayImages);
  getData();  
});