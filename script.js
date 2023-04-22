const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'd4d2ef91d2msheb4e361497e6316p15be43jsnb2284f3dc27a',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }

};

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function startTime(today) {

    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    return h + ":" + m + ":" + s;


}

Time.innerHTML = startTime(new Date());
function degreesToDirection(degrees) {
    var directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    var index = Math.round(degrees / 45) % 8;
    return directions[index];
}

function getWeather (cityn) {
    city.innerHTML = cityn;
    let resp;
    fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + cityn, options)
        .then(response => response.json())
        .then(response => {
        console.log(response)
        const weatherConditions = {
            sunny: {
                temperature: 'hot',
                cloudiness: 'clear',
                wind: 'calm'
            },
            partlyCloudy: {
                temperature: 'warm',
                cloudiness: 'partly cloudy',
                wind: 'moderate'
            },
            thunderstorm: {
                temperature: 'hot',
                cloudiness: 'overcast',
                wind: 'strong'
            },
            clearNight: {
                temperature: 'mild',
                cloudiness: 'clear',
                wind: 'calm'
            },
            lightDrizzle: {
                temperature: 'cool',
                cloudiness: 'overcast',
                wind: 'light'
            }
        };
        resp=response;
        console.log(response,resp);
        const sunsetTime = new Date(response.sunset * 1000); // convert Unix timestamp to milliseconds
        const sunriseTime = new Date(response.sunrise * 1000); // convert Unix timestamp to milliseconds
        const currentTime = new Date();
        console.log(sunriseTime,sunsetTime,currentTime)

        let weatherCondition;
        if (response.cloud_pct < 50) {
            if(sunriseTime<sunsetTime){
                if (sunsetTime > currentTime && sunriseTime < currentTime) {
                    weatherCondition = 'sunny';
                } else {
                    weatherCondition = 'clearNight';
                }
            }
            else{
                if (sunsetTime < currentTime && sunriseTime > currentTime) {
                    weatherCondition = 'sunny';
                } else {
                    weatherCondition = 'clearNight';
                }
            }
        } else if (response.cloud_pct < 80) {
            weatherCondition = 'partlyCloudy';
        } else if (response.cloud_pct >= 80 && response.humidity >= 80 && response.wind_speed < 10) {
            weatherCondition = 'lightDrizzle';
        } else if (response.cloud_pct >= 80 && response.humidity >= 80 && response.wind_speed >= 10 && sunsetTime < currentTime && sunriseTime > currentTime) {
            weatherCondition = 'thunderstorm';
            // document.getElementById('thunderstorm').id = 'thunderstorm-night'; // add id of 'thunderstorm-night'
        } else {
            weatherCondition = 'thunderstorm';
        }
        
        
        // con.innerHTML=weatherCondition+"";
        const myElement = document.querySelectorAll('.con'); // select an element with id "my-element"');
        myElement[0].id = weatherCondition;
        const mye2 = document.getElementsByName('con');
        if(weatherCondition!="thunderstorm")
            mye2[0].id = weatherCondition;
        // mye2.id=weatherCondition;
        console.log(weatherCondition);
        // Output the weather condition
        inf.innerHTML = "The current weather condition is "+ weatherConditions[weatherCondition].temperature+"  and "+weatherConditions[weatherCondition].cloudiness+" with "+weatherConditions[weatherCondition].wind+ " winds.";
        temp.innerHTML = response.temp;
        W_speed.innerHTML = response.wind_speed;
        w_deg.innerHTML = "Wind Direction <b>"+ degreesToDirection(response.wind_degrees);
        c_per.innerHTML = "Cloud Percentage is <b>"+response.cloud_pct+"%";
        feels.innerHTML = "Temperature Feels Like <b>"+response.temp+" &#8451;";
        maxt.innerHTML = "Max Temperature <b>"+response.max_temp+" &#8451;";
        mint.innerHTML = "Min Temperature <b>"+response.min_temp+" &#8451;";
        hum.innerHTML = "Humidity is <b>"+response.humidity;
        s_rise.innerHTML = "Sunrise Time<b> "+startTime(sunriseTime);
        s_set.innerHTML = "Sunset Time<b> "+startTime(sunsetTime);
        
        // console.log(`The current weather condition is ${weatherConditions[weatherCondition].temperature} and ${weatherConditions[weatherCondition].cloudiness} with ${weatherConditions[weatherCondition].wind} winds.`);
    })
    // .catch(err => console.error(err));
    // Define the weather data
    return resp;
    // Define the weather condition classifications
    
    
}
function getWeathers(cityName) {
    // city.innerHTML = cityName;
    return fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${cityName}`, options)
        .then(response => response.json())
        .then(response => {
            // Process the response data
            const weatherConditions = {
                sunny: {
                    temperature: 'hot',
                    cloudiness: 'clear',
                    wind: 'calm'
                },
                partlyCloudy: {
                    temperature: 'warm',
                    cloudiness: 'partly cloudy',
                    wind: 'moderate'
                },
                thunderstorm: {
                    temperature: 'hot',
                    cloudiness: 'overcast',
                    wind: 'strong'
                },
                clearNight: {
                    temperature: 'mild',
                    cloudiness: 'clear',
                    wind: 'calm'
                },
                lightDrizzle: {
                    temperature: 'cool',
                    cloudiness: 'overcast',
                    wind: 'light'
                }
            };

            const sunsetTime = new Date(response.sunset * 1000); // convert Unix timestamp to milliseconds
            const sunriseTime = new Date(response.sunrise * 1000); // convert Unix timestamp to milliseconds
            const currentTime = new Date();

            let weatherCondition;
            if (response.cloud_pct < 50) {
                if (sunriseTime < sunsetTime) {
                    if (sunsetTime > currentTime && sunriseTime < currentTime) {
                        weatherCondition = 'sunny';
                    } else {
                        weatherCondition = 'clearNight';
                    }
                } else {
                    if (sunsetTime < currentTime && sunriseTime > currentTime) {
                        weatherCondition = 'sunny';
                    } else {
                        weatherCondition = 'clearNight';
                    }
                }
            } else if (response.cloud_pct < 80) {
                weatherCondition = 'partlyCloudy';
            } else if (response.cloud_pct >= 80 && response.humidity >= 80 && response.wind_speed < 10) {
                weatherCondition = 'lightDrizzle';
            } else if (response.cloud_pct >= 80 && response.humidity >= 80 && response.wind_speed >= 10 && sunsetTime < currentTime && sunriseTime > currentTime) {
                weatherCondition = 'thunderstorm';
                document.getElementById('thunderstorm').id = 'thunderstorm-night'; // add id of 'thunderstorm-night'
            } else {
                weatherCondition = 'thunderstorm';
            }
 
            // Return the processed response data
            return {
                weatherCondition: weatherCondition,
                temperature: response.temp,
                windSpeed: response.wind_speed,
                windDirection: degreesToDirection(response.wind_degrees),
                cloudPercentage: response.cloud_pct,
                feelsLikeTemperature: response.temp,
                maxTemperature: response.max_temp,
                minTemperature: response.min_temp,
                humidity: response.humidity,
                sunriseTime: startTime(sunriseTime),
                sunsetTime: startTime(sunsetTime),
                weatherDescription: `The current weather condition is ${weatherConditions[weatherCondition].temperature} and ${weatherConditions[weatherCondition].cloudiness} with ${weatherConditions[weatherCondition].wind} winds.`
            };
        })

}


submit.addEventListener('click', (e) => {
    e.preventDefault();
    getWeather(cityname.value)
    // .then(data =>{
    //     city.innerHTML=cityname.value;
    //     inf.innerHTML = dataweatherDescription;
    //     temp.innerHTML = data.temperature;
    //     W_speed.innerHTML = data.windSpeed;
    //     w_deg.innerHTML = "Wind Direction <b>" + degreesToDirection(data.windDirection);
    //     c_per.innerHTML = "Cloud Percentage is <b>" + data.cloudPercentage + "%";
    //     feels.innerHTML = "Temperature Feels Like <b>" + data.temperature + " &#8451;";
    //     maxt.innerHTML = "Max Temperature <b>" + data.maxTemperature + " &#8451;";
    //     mint.innerHTML = "Min Temperature <b>" + data.minTemperature + " &#8451;";
    //     hum.innerHTML = "Humidity is <b>" + data.humidity;
    //     s_rise.innerHTML = "Sunrise Time<b> " + startTime(data.sunriseTime);
    //     s_set.innerHTML = "Sunset Time<b> " + startTime(data.sunsetTime);
    //     const myElement = document.querySelectorAll('.con'); // select an element with id "my-element"
    //     myElement[0].id = data.weatherCondition;

    //     myElement[1].id = data.weatherCondition;
    //     // mye2.id=weatherCondition;
    //     // console.log(weatherCondition);
    // })

})


getWeathers("New York")
    .then(data => {
    
        ntemp.innerHTML = data.temperature;
        nfeels.innerHTML = data.feelsLikeTemperature;
        ncp.innerHTML = data.cloudPercentage;
        nhum.innerHTML = data.humidity;
        nwd.innerHTML = data.windDirection;
        nws.innerHTML = data.windSpeed+" km/hr";
  })
    .catch(error => {
        // handle the error
        console.error(error);
    });
getWeathers('London')
    .then(data => {
    
        ltemp.innerHTML = data.temperature;
        lfeels.innerHTML = data.feelsLikeTemperature;
        lcp.innerHTML = data.cloudPercentage;
        lhum.innerHTML = data.humidity;
        lwd.innerHTML = data.windDirection;
        lws.innerHTML = data.windSpeed+" km/hr";
  })
    .catch(error => {
        // handle the error
        console.error(error);
    });
    getWeathers('Tokyo')
    .then(data => {
    
        ttemp.innerHTML = data.temperature;
        tfeels.innerHTML = data.feelsLikeTemperature;
        tcp.innerHTML = data.cloudPercentage;
        thum.innerHTML = data.humidity;
        twd.innerHTML = data.windDirection;
        tws.innerHTML = data.windSpeed+" km/hr";
  })
    .catch(error => {
        // handle the error
        console.error(error);
    });

var r = getWeather('New Delhi');



