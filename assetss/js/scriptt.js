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

//UV Index//
//=====================???????//

//Get city and data
firstResponse = (object,value) => {
    let cityName = object.city.name;
    let cityHum= [];
    let cityTemp = [];
    let cityIcon = [];
    let citySpeed = [];
    let cityDate = [];

    console.log(object)

    //icon
    for(let i = 0; i < 5; i++){
        //console.log("hit");
        cityHum.push(object.list[i].main.humidity);
        cityTemp.push(toFahrenheit(object.list[i].main.temp));
        cityIcon.push("http://openweathermap.org/img/w/" + object.list[i].weather[0].icon + ".png");
        citySpeed.push(object.list[i].wind.speed);
        cityDate.push(date(i));
    }

    setToLocalStorage(cityName);

    lastCityDisplay();
    displayCityInfo(cityName, cityHum, cityTemp, cityIcon, citySpeed, cityDate, value);
    displayForecast(cityHum, cityTemp, cityIcon, cityDate);

    lastCityDisplay = cityName;
    localStorage.setItem('lastCityDisplay', JSON.stringify(lastCityDisplay));

}

//Display function: adding cities to list
displayCityList = () => {
    cityListEl.empty();

    let jsonCitiesArray = getDataFromLocalStorage();
    if(jsonCitiesArray == null){return};
    for (let i = 0; i < jsonCitiesArray.length; i++){
        let cityTitle = $('<li>').addClass('list-group-item')
                                 .attr('data-city', jsonCitiesArray[i])
                                 .attr('data-index', i)
                                 .text(jsonCitiesArray[i]);
        cityListEl.prepend(cityTitle);
    }
}

//display history button
cityHistoryEvent = e => {
    e.preventDefault();
    let city = $(e.target).data('city').toLowerCase()
    getWeather(city);

    lastCityDisplay = $(e.target).data('city');
    
    localStorage.setItem('lastCityDisplay', JSON.stringify(lastCityDisplay));
}

//City info