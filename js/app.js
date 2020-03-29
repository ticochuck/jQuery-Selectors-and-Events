'use strict';

let keywords = [];

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
  $('select').empty();
  $('select').append(`<option value="default">Filter by Keyword</option>`);
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

function getData(dataFile) {
  $.ajax(dataFile)
  .then(data => {
    data.forEach((object, idx) => {
      let gallery = new Creature(object);
      renderCreatures(gallery, "#creatures-template", ".targets");
      appendToSelectMenu(object.keyword);
    })
    appendToKeywordsArray();
  });
}

function renderPage(dataFile) {
  keywords = [];
  $('section').remove();
  getData(dataFile);
}

$(document).ready(function() {
  $('select').on('change', displayImages);
  $('#pageOne').on('click', function() {
    renderPage('data/page-1.json');
  })
  $('#pageTwo').on('click', function() {
    renderPage('data/page-2.json');
  })
  renderPage('data/page-1.json');
});

