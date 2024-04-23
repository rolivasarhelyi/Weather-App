"use strict";

const apiKey = "ba9f75ce4c831746e5c1aea8c5620660";
const button = document.querySelector(".btn");
const cityText = document.querySelector(".city-name");
const cardTemp = document.querySelector(".card-bottom__temp");
const cardDesc = document.querySelector(".card-bottom__desc");
const welcome = document.querySelector(".welcome-message");
const card = document.querySelector(".card");
const cardImage = document.querySelector(".card-mid__img");

function getInput() {
  const inputCity = document.querySelector("input").value;
  if (inputCity == "") {
    alert("You must enter a city name");
    return false;
  } else {
    cityText.innerText = inputCity.charAt(0).toUpperCase() + inputCity.slice(1);
    welcome.classList.add("hidden");
    card.classList.remove("hidden");
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${inputCity}&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        const lat = data[0].lat;
        const lon = data[0].lon;
        console.log(data);
        console.log(lat, lon);

        return fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            const description = data.weather[0].description;
            const temperature = data.main.temp;
            cardDesc.innerText = description;
            console.log(description);
            cardImage.src = `images/${description}.png`;
            cardTemp.innerText = `${Math.ceil(temperature - 273.15)}°C`;
          });
      })
      .catch((err) => {
        alert("Please enter a valid city name");
      });
    document.querySelector("input").value = "";
  }
}

button.addEventListener("click", getInput);
