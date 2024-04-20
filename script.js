"use strict";

const apiKey = config.MY_KEY;
const button = document.querySelector(".btn");
const paragraph = document.querySelector("p");

function getInput() {
  const input = document.querySelector("input").value;

  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${input}&appid=${config.MY_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      const lat = data[0].lat;
      const lon = data[0].lon;
      console.log(data);
      console.log(lat, lon);

      return fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${config.MY_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          const description = data.weather[0].description;
          paragraph.innerText = description;
        });
    });
}

button.addEventListener("click", getInput);
