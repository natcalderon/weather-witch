var userForm = document.querySelector("#user-form");
var cityInput = document.querySelector("#city-input");
var weatherForecast = document.querySelector("#forecast");
var todaysDate = document.querySelector("#today");
var searched = document.querySelector("#searched-city")
var api = 'bb0c685cfb4c30634d1d2c9dacc3fb9c'

// fuction to receive search value
var formSubmit = function(event) {
    event.preventDefault();
    // get value from input element
    var cityName = cityInput.value.trim();

    if (cityName) {
        // searchedCity(cityName);
        searched.textContent = cityName 
        todaysDate.textContent = moment(new Date()).format("MM/DD/YYYY");
        cityInput.value = "";
        getCity(cityName);
    } else {
         alert("Please enter a city");
    }
    console.log(event);
  };

userForm.addEventListener("submit", formSubmit);

// api to pull current city weather conditions 
var getCity = function(city) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=` + city + `&appid=bb0c685cfb4c30634d1d2c9dacc3fb9c&units=imperial`;
    
  
    // make a get request to url
    fetch(apiUrl).then(function(response) {
      response.json().then(function(data) {
        console.log(data, city);
      });
    }) .then(forecast(city))
  };



//   getCity();


// set search history to local storage


// api to find UV index and assign color
function uvIndex(city) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api}&units=imperial`;

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
          console.log(data, city);
        });
      })
    console.log(city);
}



// api to pull 5 day forecast and display dynamically 
function forecast(city) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api}&units=imperial`;

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
          console.log(data, city);
        });
      })
    console.log(city);
}



