

//Variables
//var searchBtn = $('#search-btn');
//var inputCity = $('#input-search');
//var cities = $('.city');
//var resultCitEL = $('#current-location');
//var resultTempEL = $('#current-temp');
//var resultWindEL = $('#current-wind');
//var resultHumEl = $('#current-hum');
//var resultUvEL =$('#current-uv');
//var uvColor = $('.uvColor');
//var fahrenheitEl = $('#fahrenheit');

//Local storage cities
//var cityHistory= [];

  
// API key
const api = {
    key: "3f01d65ad17f9cce16a27214c18fd113",
    base: "https://api.openweathermap.org/data/2.5/"
}

//Setting up search box
const searchBox = document.querySelector('#input-search');
const searchBtn = document.querySelector('#search-btn');


searchBox.addEventListener('keypress', setQuery);

//13 = enter key
function setQuery(event) {
    if (event.keyCode == 13) {
        getResults(searchBox.value);

        //console.log(searchBox.value);
    }
}

//changing URL and apply fahrenheit
function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
    .then(weather => {
        return weather.json(); 
    }).then(displayResults);
}

//Current searched location
function displayResults (weather) {
    console.log(weather);

    //Searched location title
    let searchedCity = document.querySelector('#current-location');
    searchedCity.innerText = `${weather.name}`;

   let now = new Date();
   let date = document.querySelector('#current-date');
   date.innerText = dateBuilder(now);

   let temp = document.querySelector('#current-temp');
   temp.innerHTML = `${Math.round(weather.main.temp)}<span>°f</span>`;
}

function dateBuilder (d) {
    let months = ["January", "February", "March", 
    "April", "May", "June", "July", "August",
     "September", "October", "November", "December"];
    
    let days = ["Monday","Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}