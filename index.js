const express = require("express");
const ejs = require("ejs");
const bodyparser = require("body-parser");
const app = express();
const https = require("https");
const app_id = require("./appid");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));

var city = "";
var unit = "metric";

var icons = {
    i01d : 'fa-solid fa-sun',
    i01n : 'fa-solid fa-moon',
    i02d : 'fa-solid fa-cloud-sun',
    i02n : 'fa-solid fa-cloud-moon',
    i03d : 'fa-solid fa-cloud',
    i03n : 'fa-solid fa-cloud',
    i04d : 'fa-sharp fa-solid fa-cloud',
    i04n : 'fa-sharp fa-solid fa-cloud',
    i09d : 'fa-solid fa-cloud-showers-heavy',
    i09n : 'fa-solid fa-cloud-showers-heavy',
    i10d : 'fa-solid fa-cloud-sun-rain',
    i10n : 'fa-solid fa-cloud-moon-rain',
    i11d : 'fa-solid fa-cloud-bolt',
    i11n : 'fa-solid fa-cloud-bolt',
    i13d : 'fa-solid fa-snowflake',
    i13n : 'fa-solid fa-snowflake',
    i50d : 'fa-solid fa-smog',
    i50n : 'fa-solid fa-smog'

};



// const weatherData = null ;

app.get("/", function (req, res) {
  res.render("getlocation");
});

app.post("/", function (req, res) {
  city = req.body.cityName;
  console.log(city);

  res.redirect("/weather-report");
});

app.get("/weather-report", function (req, res) {
  if (city == "") {
    res.redirect("/");
  } else {
    const date = new Date();
console.log(date);
const current_date =
  date.getDate() +
  "-" +
  date.getMonth() +
  "-" +
  date.getFullYear() +
  " " +
  date.getHours() +
  ":" +
  date.getMinutes();
    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=ce7180a372178ca09951ae9bc6cd6c6e&units=metric";
    const url_1 =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      app_id +
      "&units=" +
      unit;
    const url_2 =
      "https://api.openweathermap.org/data/2.5/forecast?cnt=32&q=" +
      city +
      "&appid=" +
      app_id +
      "&units=" +
      unit;
    https.get(url_1, function (response) {
      response.on("data", function (data1) {
        var weatherData = JSON.parse(data1);

        console.log(weatherData.cod);
        // console.log(weatherData.main.humidity);
        // console.log(weatherData.main.pressure);
        // console.log(weatherData.wind.speed);

        https.get(url_2, function (response) {
          response.on("data", function (data2) {
            var forecastData = JSON.parse(data2);

            // console.log(forecastData.list[0].main.temp);
            // console.log(forecastData.list[0].dt_txt);
            // console.log(forecastData.list[1].main.temp);
            // console.log(forecastData.list[1].dt_txt);

            res.render("weather", { date: current_date, current: weatherData ,forecast: forecastData , icons: icons});
          });
        });
        
        // res.render("weather", { date: current_date, current: weatherData ,forecast: forecastData});
      });
    });
  }
});

app.post("/weather-report", function (req, res) {
  city = req.body.cityName;
  console.log(city);
  res.redirect("/weather-report");
});

app.listen(3300, function () {
  console.log("I am Listening");
});
