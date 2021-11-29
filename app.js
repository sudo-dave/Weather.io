// Main Box selectors
var serachBtn;
var inputContainer;
var userInputTextFeild;
var cardContainer;

//Selectors of card
var card;
var city;
var description;
var currentTempature;
var humididty;
var airP;
var wind;

var firstLoad = true;

// Enter OpenWeatherAPI
const apiKey = "";

window.onload = (load) => {
  if (apiKey) init();
  else alert("API key not FOUND. Please input app.js file");
};

function init() {
  serachBtn = document.getElementById("locBtn");
  inputContainer = document.getElementById("inputContainer");
  userInputTextFeild = document.querySelector(".userInput");
  cardContainer = document.getElementById("cardContainer");

  if (localStorage.length) returning();
  else {
    inputContainer.style.display = "inline-block";
    inputContainer.style.animationName = "fadein";
  }

  serachBtn.addEventListener("click", serachAction);
  document.addEventListener("click", addCardAction);
  document.addEventListener("click", delCardAction);
}

function delCardAction(event) {
  if (event.target && event.target.classList == "delBtn") {
    if (localStorage.length == 1) {
      localStorage.clear();
      location.reload();
    } else {
      let itemDel = event.target.id;
      console.log("item del" + itemDel);
      itemDel = itemDel.slice(0, -1);
      document.getElementById(itemDel + "").remove();
      console.log("the id is " + itemDel);
      localStorage.removeItem("" + itemDel);
      console.log(itemDel);

      if (localStorage.length == 3)
        document.getElementById("addcard").style.display = "none";
      else document.getElementById("addcard").style.display = "inline-block";
    }
  }
}

function serachAction() {
  if (userInputTextFeild.value) getCurretWeather(userInputTextFeild.value, "");
  else alert("Enter a city");
}

function addCardAction(event) {
  if (
    event.target.id == "addcard" ||
    event.target.classList == "fa fa-plus-circle fa-3x"
  ) {
    let newInput = prompt("Enter a city name");

    if (newInput) getCurretWeather(newInput, "");
    else alert("Enter a city");
  }
}
// ***
async function getWeatherData(location) {
  console.log("starting wiht" + location);
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    location +
    "&units=imperial&appid=" +
    apiKey;

  const res = await fetch(url);
  if (!res.ok) {
    alert("Invalid city name");
    throw new Error(`Error: ${res.status}`);
  }
  const data = await res.json();
  return data;
}

function getCurretWeather(input, flag) {
  getWeatherData(input)
    .then((data) => {
      if (!firstLoad) document.getElementById("addcard").remove();

      firstLoad = false;

      let index;

      if (flag) index = flag;
      else index = saveLocal(input);

      if (!index) throw Error("max card limit");

      console.log("&");
      console.log(data);

      console.log("befroe" + index);
      cardContainer.insertAdjacentHTML(
        "beforeend",
        '  <div class="card" id ="' +
          index +
          '"><div class="mainDay" id ="' +
          index +
          '"> <button class ="delBtn" id =' +
          index +
          '"> X </button> <h2 class="City"id ="' +
          index +
          '"></h2> <h2 class="description"id ="' +
          index +
          '"></h2> <h1 class="currentTemp"id ="' +
          index +
          '"></h1><div class="moreData"id ="' +
          index +
          '"><div><h1> Humidity</h1> <p class="humididy"id ="' +
          index +
          '"></p></div><div> <h1> Preresure </h1><p class="Preresure"id ="' +
          index +
          '"></p></div> <div> <h1> Wind </h1> <p class="Wind"id ="' +
          index +
          '"></p> </div> </div></div> </div>  <div id ="addcard"> <i class="fa fa-plus-circle fa-3x" id ="addIcon" aria-hidden="true"></i> </div>'
      );

      // *****
      card = document.querySelector("#" + index + ".card");
      city = document.querySelector("#" + index + ".City");
      description = document.querySelector("#" + index + ".description");
      currentTempature = document.querySelector("#" + index + ".currentTemp");
      humididty = document.querySelector("#" + index + ".humididy");
      airP = document.querySelector("#" + index + ".Preresure");
      wind = document.querySelector("#" + index + ".Wind");

      var name = data["name"];
      var currentTemp = data["main"]["temp"];
      var descr = data["weather"][0]["description"];
      var currentAir = data["main"]["pressure"];
      var currentSpeed = data["wind"]["speed"];
      var humid = data["main"]["humidity"];
      var iconId = data["weather"][0]["icon"];
      var img = document.createElement("img");

      img.src = "Images/" + iconId + ".png";
      img.className = "currentTempIcon";

      city.textContent = name;
      description.textContent = descr;
      currentTempature.innerHTML = Math.round(currentTemp) + "°";
      currentTempature.appendChild(img);
      airP.textContent = Math.round(currentAir) + " hPa";
      wind.textContent = Math.round(currentSpeed) + " mph";
      humididty.textContent = Math.round(humid) + "%";

      inputContainer.style.animationName = "fadeout";
      inputContainer.style.display = "none";
      card.style.animationName = "fadein";
      card.style.display = "inline-block";

      if (localStorage.length === 3)
        document.getElementById("addcard").style.display = "none";
      else document.getElementById("addcard").style.display = "inline-block";
    })
    .catch((e) => console.log("***" + e));
}

function saveLocal(input) {
  if (!localStorage.getItem("zero")) {
    localStorage.setItem("zero", input);
    return "zero";
  } else if (!localStorage.getItem("one")) {
    localStorage.setItem("one", input);
    return "one";
  } else if (!localStorage.getItem("two")) {
    localStorage.setItem("two", input);
    return "two";
  } else return false;
}

function returning() {
  if (localStorage.getItem("zero"))
    getCurretWeather(localStorage.getItem("zero"), "zero");
  if (localStorage.getItem("one"))
    getCurretWeather(localStorage.getItem("one"), "one");
  if (localStorage.getItem("two"))
    getCurretWeather(localStorage.getItem("two"), "two");
}
