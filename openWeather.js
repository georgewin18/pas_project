const key = "2ee1f50b42f9a9574aa53907971c6b27";
const url = "http://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".searchBar input");
const searchButton = document.querySelector(".searchBar button");
const icon = document.querySelector(".icon");

async function weatherCheck(city) {
  try {
    // check apakah city tidak kosong
    if (!city) {
      alert("Silahkan ketik kota");
      searchBox.focus();
      return;
    }
    const response = await fetch(url + city + `&appid=${key}`);
    var data = await response.json();
    console.log(url + city + `&appid=${key}`);

    document.querySelector(".weather").style.display = "flex";

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
    document.querySelector(".cloud").innerHTML = data.clouds.all + "%";

    if (data.weather[0].main == "Clouds") {
      icon.src = "resource/clouds.png";
    } else if (data.weather[0].main == "Rain") {
      icon.src = "resource/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      icon.src = "resource/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      icon.src = "resource/mist.png";
    }

    // set url forecast
    document.querySelector("#link_forecast").href = `forecast.html?&city=${city}`;
  } catch (error) {
    console.log(error);
    alert("Terjadi Kesalahan");
  }
}

// triggern function by key binding (ENTER)
searchBox.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    weatherCheck(searchBox.value);
  }
});

searchButton.addEventListener("click", () => {
  weatherCheck(searchBox.value);
});
