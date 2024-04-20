"use strict";

const button = document.querySelector(".btn");

function getInput() {
  const input = document.querySelector("input").value;

  fetch(
    `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=iivZwJbuLRSmT8FkFQFsnprbAKdGSAyu=${input}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const locationId = data[0].Key;
      return fetch(
        `http://dataservice.accuweather.com/currentconditions/v1/${locationId}?apikey=iivZwJbuLRSmT8FkFQFsnprbAKdGSAyu`
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
