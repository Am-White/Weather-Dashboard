//Geo-location
weatherByUserLocation = () => {
    if (navigator.geolocation) {
        console.log(navigator.geolocation)
        navigator.geolocation.getCurrentPosition(findUserPosition);
    } else {
        console.log("Geolocation is not supported.");
    }
}

findUserPosition = (position) => {
    lat = position.coords.latitude;
    long = position.coords.longitude;

    //API-KEY
    const APIKey = "3f01d65ad17f9cce16a27214c18fd113";

    const queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+ APIKey;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        var city = response.city.name.toLowerCase();
        getWeather(city);
    });
}
weatherByUserLocation();
