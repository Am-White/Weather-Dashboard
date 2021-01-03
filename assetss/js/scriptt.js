const citiesEl = $('#cities');
const cityBtn = $('#btn-search');
const cityListEl = $('cities-list');
const cityInfoEl = $('city-info');
const forecastEl = $('forecast');

let lastCityDisplay;


//Search city function
searchCity = e => {
    e.preventDefault();
    //Value of city
    var city = citiesEl.val().toLowerCase();
    getWeather(city);
}

//API function
getWeather = (city) => {
    const APIKey = "3f01d65ad17f9cce16a27214c18fd113";
    const baseURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ city + "&appid=" + APIKey;

    $.ajax({
        url: baseURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        findUvIndex(response.city.coord.lat, response.city.coord.lon, response);
    });
}