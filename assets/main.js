//consum api from weatherapi-com.p.rapidapi.com
//https://rapidapi.com/community/api/open-weather-map/endpoints

const getWeatherForecast  = async (cityName) => {
  try{
    const response = await fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${cityName}&days=3`, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
          "x-rapidapi-key": ProcessingInstruction.env.API_KEY,
        },
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return;
    }
  }
  const displayCityName = (weatherData) => {
    const cityNameDiv = document.getElementById("city-description");
    const cityName = weatherData.location.name;
    const countryName = weatherData.location.country;
    const element = `<h2>Showing the weather of ${cityName}, ${countryName}<h2>`;
    cityNameDiv.innerHTML = element;
  }


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



