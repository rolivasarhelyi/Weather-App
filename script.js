"use strict";

const apiKey = config.MY_KEY;
const button = document.querySelector(".btn");

function getInput() {
  const input = document.querySelector("input").value;

  fetch(
    `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}=${input}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const locationId = data[0].Key;
      return fetch(
        `http://dataservice.accuweather.com/currentconditions/v1/${locationId}?apikey=${apiKey}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const weatherText = data[0].WeatherText;
          document.querySelector(".city-text").innerText = input;
          document.querySelector("p").innerText = weatherText;
        });
    });
}

button.addEventListener("click", getInput);
