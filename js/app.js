'use strict';

let keywords = [];
let titleArr = [];
let allInfo = [];
let hornArr = [];

function Creature(object) {
  this.url = object.image_url;
  this.title = object.title;
  this.description = object.description;
  this.keyword = object.keyword;
  this.horns = object.horns;
  allInfo.push(this);
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

function appendToKeywordsArray(keyword) {
  if (!keywords.includes(keyword)) {
    keywords.push(keyword);
  }
}

function appendToSelectMenu() {
  keywords.sort();
  $('select').empty();
  $('select').append(`<option value="default">Filter by Keyword</option>`);
  for (let i = 0; i < keywords.length; i++) {
    $('select').append(`<option value="${keywords[i]}">${keywords[i]}</option>`);
  }
}

function renderCreatures(creature, sourceID, target) {
  let $target = $(target);
  let $templateMarkUp = $(sourceID).html();
  let newMarkup = Mustache.render($templateMarkUp, creature)
  $target.append(newMarkup);
}

function appendToTitlesArray(title) {
  titleArr.push(title);
  titleArr.sort();
}

function sortByTittle () {
  let $radioTitle = $("input[value='byTitle']:checked").val();
  if ($radioTitle) {
    $('section').hide();
    for (let x = 0; x < allInfo.length; x++) {
      let xyz = allInfo[x];
      if (xyz === $('section').title) {}
        // renderCreatures(allInfo[x], "#creatures-template", ".creaturesClass");
        $('section').fadeIn();
    }
  }
}
 
function sortByHorns () {
  let $radioTitle = $("input[value='byHorns']:checked").val();
  if ($radioTitle) {
    $('section').hide();
    allInfo.sort();
    for (let x = 0; x < allInfo.length; x++) {
      let xyz = allInfo[x].horns;
      // renderCreatures(allInfo[x], "#creatures-template", ".creaturesClass")
      $('section').fadeIn();
    }
  }
}

function getData(dataFile) {
  $.ajax(dataFile)
  .then(data => {
    data.forEach((object, idx) => {
      let gallery = new Creature(object);
      appendToKeywordsArray(object.keyword);
      appendToTitlesArray(object.title);
      renderCreatures(gallery, "#creatures-template", ".creaturesClass");
      // gallery.sort(object.title);
    })
    appendToSelectMenu();
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
  $("input[value='byTitle']").on('click', function() {
    sortByTittle();
  })
  $("input[value='byHorns']").on('click', function() {
    sortByHorns();
  })
  renderPage('data/page-1.json');
});