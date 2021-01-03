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
findUvIndex = (lat, lon, object) => {
    var APIKey = "3f01d65ad17f9cce16a27214c18fd113";
    var baseURL = "https://api.openweathermap.org/data/2.5/uvi?lat="+ lat +"&lon="+lon +"&appid=" + APIKey;
    
    $.ajax({
        url: baseURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        var value = response.value;
        console.log("UVINDEX: "+value);
        firstResponse(object,value);
    });
    
}

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

//City info for today
displayCityInfo = (cityName, cityHum, cityTemp, cityIcon, citySpeed, cityDate, uvIndex) => {
    cityInfoEl.empty();
        const title = $("<h3>").test(cityName + " " + "(" +cityDate[0]+")");
        const temp = $("<p>").text("Temperature: "+cityTemp[0] + "F");
        const hum = $("<p>").text("Humidity: "+ cityHum[0] + "%");
        const windSpeed = $("<p>").text("Wind Speed: " + citySpeed[0] + "MPH");
        const icon = $("<img>").attr('src', cityIcon[0]);
        const uv = $("<p>").text("UV Index: "+ uvIndex).addClass(checkUVIndexValue(uvIndex));

        cityInfoEl.append(title,temp,hum,windSpeed,icon,uv);
}

//5DAY forecast ( f(five-day) for i(index) )
displayForecast = (cityHum, cityTemp, cityIcon, cityDate) =>{
    forecastEl.empty();
    for( let f = 0; f < 5; f++){
        const forecastDiv = $('<div>').addClass('col-12 col-md-2  bg-primary rounded ml-3 mb-3');
        const dateEl = $('<h6>').text(cityDate[f]);
        const iconEl = $('<img>').attr('src',cityIcon[f]);
        const tempEl = $('<p>').text("Temp: "+cityTemp[f]+ "F");
        const humEl = $('<p>').text("Humidity: "+cityHum[f]+"%");

        forecastDiv.append(dateEl,iconEl,tempEl,humEl);
        forecastEl.append(forecastDiv);
        }


}