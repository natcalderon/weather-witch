var userForm = document.querySelector("#user-form");
var cityInput = document.querySelector("#city-input");
var weatherForecast = document.querySelector("#forecast");
var todaysDate = document.querySelector("#today");
var searched = document.querySelector("#searched-city");
var cityHistory = document.querySelector("#city-history");
var api = 'bb0c685cfb4c30634d1d2c9dacc3fb9c'
var lat = "latitude";
var lon = "longitude";
var string = [];



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


// set search history to local storage
console.log('string before', string)
if(string.length > 0 && !string.includes(cityName)){
string = JSON.parse(localStorage.getItem("cityHistoryList"))
string.push(cityName);
localStorage.setItem("cityHistoryList", JSON.stringify(string));
    console.log("string", string)
    cityHistory.innerHTML = "";
    string.forEach(function(item){
        var historyList = document.createElement("li");
        historyList.textContent = item;
        historyList.classList.add("flex-row", "justify-space-between", "align-center", "search-list");
        cityHistory.appendChild(historyList);

    })
  } else {
    string.push(cityName);
    localStorage.setItem("cityHistoryList", JSON.stringify(string));
    string.forEach(function(item){
      var historyList = document.createElement("li");
      historyList.textContent = item;
      historyList.classList.add("flex-row", "justify-space-between", "align-center", "search-list");
      cityHistory.appendChild(historyList);

  })
  }

  };

userForm.addEventListener("submit", formSubmit);


// api to pull current city weather conditions 
var getCity = function(city) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=` + city + `&appid=bb0c685cfb4c30634d1d2c9dacc3fb9c&units=imperial`;
    
  
    // make a get request to url
    fetch(apiUrl).then(function(response) {
      response.json().then(function(data) {
        

        $("#img").attr("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png");
        $("#temperature").text(data.main.humidity);
        $("#humidity").text(data.main.temp);
        $("#windspeed").text(data.wind.speed);
           
        getUvIndex(data.coord.lat, data.coord.lon);
        console.log(data, city);


      });
    }) .then(forecast(city))
  };




// api to find UV index and assign color

function getUvIndex(lat, lon) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${api}`;
    
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
          console.log(data.value);
          var uvIndex = $("#uv-index").text(data.value);

        if (data.value < 3){
          uvIndex.setAttribute("class", "bg-success");

      } else if(data.value >2 && uvIndex <=8){
          uvIndex.setAttribute("class", "bg-warning");
      } else if(data.value > 8){
          $('#uv-index').addClass("bg-danger");
        };
  });
})
}
      

// api to pull 5 day forecast and display dynamically 
function forecast(city) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api}&units=imperial`;

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
          console.log(data, city);
          for (var i = 5; i < 40; i += 8){

            $("#forecast").append(`
                <div class="card col-2 future-day">
                  <h6 class="future-date" style="float: left;"></h6>
                  <img class="future-icon" src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png">
                     <ul>
                       <li>Temp: ${data.list[i].main.temp}&#176</li>
                       <li>Wind: ${data.list[i].wind.speed} mph</li>
                       <li>Humidity: ${data.list[i].main.humidity}%</li>
                     </ul>
                  </div>
            `) 
        }

        for (var x = 1; x <= 5; x++){
            $(".future-date").eq(x - 1).text(moment().add([x], "d").format("(MM/DD/YYYY)"));
            console.log($(".future-date").text());
          }
        });
    });
}
