const citiesEl = $('#cities');
const cityBtn = $('#btn-search');
const cityListEl = $('cities-list');
const cityInfoEl = $('city-info');
const forecastEl = $('forecast');

//Search city function
searchCity = e => {
    e.preventDefault();
    //Value of city
    var city = citiesEl.val().toLowerCase();
    getWeather(city);
}