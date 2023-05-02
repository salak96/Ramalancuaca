//import dotenv from "dotenv";
// import WEATHER_API_KEY from "./apikey";

const getWeatherForecast  = async (cityName) => {
  try{
    const response = await fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${cityName}&days=3`, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
          "x-rapidapi-key":"c7b1fa5169msh503a7af3c1508bdp1328c9jsn255b5a063832"
        },
      });
      const data = await response.json();
      return data;
      console.log(data);
    } catch (error) {
      console.log(error);
      return;
    }
  }
  //menampilkan nama kota
  const displayCityName = (weatherData) => {
    const cityNameDiv = document.getElementById("city-description");
    const cityName = weatherData.location.name;
    const countryName = weatherData.location.country;
    const element = `<h2>Showing the weather of ${cityName}, ${countryName}<h2>`;
    cityNameDiv.innerHTML = element;


  }
  //menampilkan cuaca saat ini
  const displayCurrentWeather = (weatherData) => {
    const currentWeather = document.getElementById("current-weather");
    currentWeather.innerHTML = weatherData.current.cloud;
     //nama kota
     const cityName = document.createElement("p");
     cityName.innerHTML = weatherData.location.name;
     currentWeather.appendChild(cityName);
     
    const icon= document.createElement("img")
    icon.src = weatherData.current.condition.icon;
    currentWeather.appendChild(icon);
    const temp = document.createElement("p");
  
    temp.innerHTML = weatherData.current.temp_c + "℃";
    currentWeather.appendChild(temp);
    const condition = document.createElement("p");
    condition.innerHTML = weatherData.current.condition.text;
    currentWeather.appendChild(condition);
    const humidity = document.createElement("p");
    humidity.innerHTML = "Humidity: " + weatherData.current.humidity + "%";
    currentWeather.appendChild(humidity);
    const wind = document.createElement("p");
    wind.innerHTML = "Wind: " + weatherData.current.wind_kph + "kph";
    currentWeather.appendChild(wind);
   

} 
  //menampilkan cuaca 3 hari kedepan
  const displayWeatherForecast = (weatherData) => {
    const forecastDiv = document.getElementById("weather-forecast");
    forecasts = weatherData.forecast.forecastday;

    let listOfElement = "";

    for (let i = 0; i < forecasts.length; i++) {
      const forecastData = {
        date: forecasts[i].date,
        condition: forecasts[i].day.condition.text,
        conditionImage: forecasts[i].day.condition.icon,
        avg_temp: forecasts[i].day.avgtemp_c,
        max_temp: forecasts[i].day.maxtemp_c,
        min_temp: forecasts[i].day.mintemp_c,
        avg_humidity: forecasts[i].day.avghumidity
      }
      

      const element = `
        <div class="weather-container">
          <h2>Weather of ${forecastData.date}</h2>
          <p style="text">"${forecastData.condition}"</p>
          <img src="https:${forecastData.conditionImage}" class="weather-image">
          <p>Average Temperture: ${forecastData.avg_temp}℃</p>
          <p>(Maximum: ${forecastData.max_temp}℃, Minimum: ${forecastData.min_temp}℃)</p>
          <p>Average Humidity: ${forecastData.avg_humidity}%</p>
        </div>
      `;
      listOfElement += element;
    }

    forecastDiv.innerHTML = listOfElement;
  }
  //mencari cuaca
  const searchWeather = async () => {
    const cityName = document.getElementById("city-name").value;
    if (!cityName) {
      return null;
    }
    const weatherData = await getWeatherForecast(cityName);
    if (!weatherData.error) {
        displayCityName(weatherData);
        displayCurrentWeather(weatherData);
        displayWeatherForecast(weatherData);
    } else {
        alert("City not found!");
        }
  }

//