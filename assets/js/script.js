let formContainer = document.querySelector("#search-form");
let locationInputEl = document.querySelector("#location");
let fromDateInputEl = document.querySelector("#from-date");
let toDateInputEl = document.querySelector("#to-date");
let searchBtnEl = document.querySelector("#search-btn");
let currentLocationEl = document.querySelector("#current-location");
let currentDateEl = document.querySelector("#current-date");
let weatherDescriptionEl = document.querySelector("#weather-description");
let currentWeatherIconEl = document.querySelector("#current-weather-icon");
let currentTempValueEl = document.querySelector("#current-temp-value");
let highTempValueEl = document.querySelector("#high-temp-value");
let lowTempValueEl = document.querySelector("#low-temp-value");
let feelsLikeValueEl = document.querySelector("#fl-value");
let windValueEl = document.querySelector("#wind-value");
let humidityValueEl = document.querySelector("#humidity-value");
let visibilityValueEl = document.querySelector("#visibility-value");
let forecastContainerEl = document.querySelector("#forecast-container");
let savedLocationsBtnEl = document.querySelector("#saved-locations");
let newsCards = document.querySelectorAll(".news-card");
let newsAPIKey = "pub_165518ddbc391a0563b33c28f98a88bc39c78"
let cityName = ""
let newsURL = `https://newsdata.io/api/1/news?apikey=${newsAPIKey}&language=en&qInTitle=${cityName}`
let apiKey = "40640050a45cbd8cf8d35ada1e14fee3";

/** Get user's location */
let userLocation = {};
console.log(userLocation);
if (window.navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      userLocation.latitude = latitude;
      userLocation.longitude = longitude;
    },
    (err) => console.log(err)
  );
}

/** Fetch Weather data */
function getWeather(searchCity) {
  let queryUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=5&appid=${apiKey}`;

  fetch(queryUrl)
    .then((res) => res.json())
    .then((data) => {
      let cityData = data[0];

      currentLocationEl.textContent = cityData.name;

      let cityLon = cityData.lon;
      let cityLat = cityData.lat;
      getWeatherData(cityLat, cityLon);
    });
}

function getWeatherData(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
  )
    .then((res) => res.json())
    .then((weatherData) => {
      let weatherInfo = weatherData.list;

      // Display the current weather data on the screen
      currentDateEl.textContent = moment(weatherInfo[0].dt, "X").format(
        "ddd, MMM Do, h:mm A"
      );
      weatherDescriptionEl.textContent = weatherInfo[0].weather[0].description;
      currentWeatherIconEl.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${weatherInfo[0].weather[0].icon}@2x.png`
      );
      currentTempValueEl.textContent = weatherInfo[0].main.temp.toFixed();
      highTempValueEl.textContent = weatherInfo[0].main.temp_max.toFixed(2);
      lowTempValueEl.textContent = weatherInfo[0].main.temp_min.toFixed(2);
      feelsLikeValueEl.textContent = weatherInfo[0].main.feels_like;
      humidityValueEl.textContent = weatherInfo[0].main.humidity;
      windValueEl.textContent = weatherInfo[0].wind.speed;

      // Display the future weather forecast data on the screen
      let fiveDayForecastArr = [
        weatherInfo[0],
        weatherInfo[8],
        weatherInfo[16],
        weatherInfo[24],
        weatherInfo[32],
        weatherInfo[39],
      ];
      fiveDayForecastArr.forEach((forecast) => {
        let day = moment(forecast.dt, "X").format("dddd");
        let forecastWeatherIconSrc = forecast.weather[0].icon;
        let forecastTemp = forecast.main.temp.toFixed();
        forecastContainerEl.innerHTML += `
          <div class="forecast-card card">
            <img class="weather-icon" src="http://openweathermap.org/img/wn/${forecastWeatherIconSrc}@2x.png" alt="Weather Icon" id="current-weather-icon">
            <div class="forecast-day">${day}</div>
            <div>${forecastTemp}&deg;</div>
          </div>
        `;
      });
    });
}

searchBtnEl.addEventListener("click", function (e) {
  e.preventDefault();
  cityName = e.currentTarget.form[0].value;
  getNewsHeadlines();
  // Save the serached city name to local storage
  let timeSearched = moment().format("ddd, MMM Do, h:mm A");
  let itemToSaveKey = locationInputEl.value.trim();
  localStorage.setItem(`${timeSearched}`, JSON.stringify(`${itemToSaveKey}`));

  currentLocationEl.textContent = "";
  forecastContainerEl.innerHTML = "";
  getWeather(locationInputEl.value);

  // Todo - Display the "Saved Detinations" button if there are items in the local storage

let convertBtn = document.querySelector("#convertBtn")

currency()
countryInfo()
image()
});

$(function () {
  $(".datepicker").datepicker();
});

savedLocationsBtnEl.addEventListener("click", function (e) {
  e.preventDefault();

  let storedCities = { ...localStorage };
  console.log(storedCities);

  for (const property of storedCities) {
    // Create a btn within the modal display for each location
  }
});

function countryInfo() {

  let Tcountry = document.querySelector("#Tcountry")
  let Tcapital = document.querySelector("#Tcapital")
  let Tcurrency = document.querySelector("#Tcurrency")
  let TcurrencyCode = document.querySelector("#TcurrencyCode")
  let Tlanguage = document.querySelector("#Tlanguage")
  let Ttime = document.querySelector("#Ttime")
  let Tpop = document.querySelector("#Tpop")
  let Tdrive = document.querySelector("#Tdrive")
  let Tcar = document.querySelector("#Tcar")
  let Tcontinent = document.querySelector("#Tcontinent")
  let Twebsite = document.querySelector("#Twebsite")
  let country = locationInputEl.value
  let map = document.querySelector("#map")

  fetch("https://restcountries.com/v3.1/name/" + country)
    .then(response => response.json())
    .then(data =>{

      Tcountry.textContent = data[0].altSpellings[1] + " " + data[0].flag
      Tcapital.textContent = "Capital: " + data[0].capital
      Tcurrency.textContent = "Currency: " + Object.values(data[0].currencies)[0].name + " (" + Object.values(data[0].currencies)[0].symbol + ")"
      TcurrencyCode.textContent = "Code: " +  Object.keys(data[0].currencies)[0]
      Tlanguage.textContent = "Language: " + Object.values(data[0].languages)
      Ttime.textContent = data[0].timezones[0]
      Tpop.textContent = "Population: " + data[0].population.toLocaleString("en-UK")
      Tdrive.textContent = "Car drives on the " + data[0].car.side + " side"
      Tcar.textContent = "Country code on license plate " + data[0].car.signs[0]
      Tcontinent.textContent = data[0].region
      Twebsite.textContent = "Internet code: " + data[0].tld[0]
  
})
}


function currency() {
  
fetch("https://openexchangerates.org/api/latest.json?app_id=4e8c4a0043c244ccaf102892798ae1c7")
    .then(response => response.json())
    .then(data =>{

let countries = Object.keys(data.rates)

      for (let i = 0; i < countries.length; i++) {
        
        let optionCurrencyFrom = document.createElement("option")
        optionCurrencyFrom.setAttribute("value", countries[i])
        optionCurrencyFrom.innerHTML = countries[i]
        document.querySelector("#from-select").appendChild(optionCurrencyFrom)

        let optionCurrencyTo = document.createElement("option")
        optionCurrencyTo.setAttribute("value", countries[i])
        optionCurrencyTo.innerHTML = countries[i]
        document.querySelector("#to-select").appendChild(optionCurrencyTo)
         
      }})
    }


convertBtn.addEventListener("click", function(event){
event.preventDefault()

fetch("https://openexchangerates.org/api/latest.json?app_id=4e8c4a0043c244ccaf102892798ae1c7")
    .then(response => response.json())
    .then(data =>{
    
      let inputMoneyFrom = document.querySelector("#input-money").value
      let fromSelect = document.querySelector("#from-select")
      let totalCurrency = document.querySelector("#total-currency")
      let fromCurrency = fromSelect.value
      let toSelect = document.querySelector("#to-select")
      let toCurrency = toSelect.value
      let from = data.rates[fromCurrency]
      let to = data.rates[toCurrency]
      let inputMoneyFrom2 = parseInt(inputMoneyFrom)
      let total = (to/from) * inputMoneyFrom2

      totalCurrency.value = total.toFixed(2)
    }) 
})


function image() {
  
  let Icountry = locationInputEl.value

fetch("https://pixabay.com/api/?key=33442906-03cc2a6146a25307dc8dd0c8d&q=" + Icountry + "&image_type=photo&category=" + "travel")
    .then(response => response.json())
    .then(data =>{
      console.log(data)

      if(data.hits.length){
      let imageCountry = document.querySelector("#image1")
     imageCountry.src = data.hits[0].largeImageURL
      }else{

        return fetch("https://pixabay.com/api/?key=33442906-03cc2a6146a25307dc8dd0c8d&q=" + Icountry + "&image_type=photo&category=" + "places")
      } 
    }).then(response => response.json())
    .then(data =>{
      console.log(data)
      let imageCountry = document.querySelector("#image1")
     imageCountry.src = data.hits[0].largeImageURL

    })
  }
function getNewsHeadlines() {
  let newsURL = `https://newsdata.io/api/1/news?apikey=${newsAPIKey}&language=en&qInTitle=${cityName}`
  fetch(newsURL)
  .then((response) => response.json())
  .then((newsData) => {
    console.log(newsData);
    for (let i=0; i<3; i++) {
      let maxLength = 100;
      const card = newsCards[i];
      console.log(card);
      const title = card.querySelector(".card-body").querySelector(".card-title");
      title.textContent = newsData.results[i].title;
      const newsText = card.querySelector(".card-body").querySelector(".card-text");
      newsText.textContent = newsData.results[i].description.substr(0, maxLength) + "...";
      const newsImage = card.querySelector(".card-img-top");
      newsImage.setAttribute("src", newsData.results[i].image_url);
      console.log(newsData.results[i].title);
      console.log(newsData.results[i].description);
    }
  });
}


let cityAPIKey =  "5ae2e3f221c38a28845f05b6fc79de7689f7ec4f4ccd8b2ae7179f74";
let apiURL = `http://api.opentripmap.com/0.1/en/places/geoname?name=London&apikey=${cityAPIKey}`;

function getLocationInformation() {
    fetch(apiURL)
    .then((response) => response.json())
    .then((cityData) => console.log(cityData))
};

getLocationInformation();
