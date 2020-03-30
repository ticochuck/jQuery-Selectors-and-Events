'use strict';

let keywords = [];
let allInfo = []; 

function Creature(object) {
  this.url = object.image_url;
  this.title = object.title;
  this.description = object.description;
  this.keyword = object.keyword;
  this.horns = object.horns;
  allInfo.push(this);
}

//display images based on keyword
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

//append unique keywords to keywords array
function appendToKeywordsArray(keyword) {
  if (!keywords.includes(keyword)) {
    keywords.push(keyword);
  }
}

// append to select meny from keywords array
function appendToSelectMenu() {
  keywords.sort();
  $('select').empty();
  $('select').append(`<option value="default">Filter by Keyword</option>`);
  for (let i = 0; i < keywords.length; i++) {
    $('select').append(`<option value="${keywords[i]}">${keywords[i]}</option>`);
  }
}

// render creatures to the DOM 
function renderCreatures(creature, sourceID, target) {
  let $target = $(target);
  let $templateMarkUp = $(sourceID).html();
  let newMarkup = Mustache.render($templateMarkUp, creature)
  $target.append(newMarkup);
}

// sort by title ascending
function byTitle(a,b) {
  var aName = a.title.toLowerCase();
  var bName = b.title.toLowerCase(); 
  return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

// sort by number of horns - higher to lower
function byHorns(a,b) {
  var aName = a.horns
  var bName = b.horns;
  return (bName - aName);
}

//render sorted creatures to the DOM
function renderSortedItems() {
  $('section').remove();
  for (let x = 0; x < allInfo.length; x++) {
    renderCreatures(allInfo[x], "#creatures-template", ".creaturesClass");
  }
}

// sort based on radio button 
function sortbyTitleOrHorns () {
  let $radioHorns = $("input[value='byHorns']:checked").val();
  if ($radioHorns) {
    allInfo.sort(byHorns);
  } else {
    allInfo.sort(byTitle);
  }
  renderSortedItems();
}

// parse JSON data and creates new objects and shows initial page
// creatures are display sorted by title by default
function getData(dataFile) {
  allInfo = [];
  $.ajax(dataFile)
  .then(data => {
    data.forEach((object, idx) => {
      new Creature(object);
      sortbyTitleOrHorns()
      appendToKeywordsArray(object.keyword);
    })
    appendToSelectMenu();
  });
}

//clears page when rendered
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
    sortbyTitleOrHorns();
  })
  $("input[value='byHorns']").on('click', function() {
    sortbyTitleOrHorns();
  })
  renderPage('data/page-1.json');
});