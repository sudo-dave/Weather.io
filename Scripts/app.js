// // selcotrs
const serachBtn = document.getElementById("locBtn");
const inputContainer = document.getElementById("inputContainer");
const userInputTextFeild = document.querySelector(".userInput");

const cardContainer = document.getElementById("cardContainer");
const city = document.getElementById("City");
const description = document.getElementById("description");
const currentTempature = document.getElementById("currentTemp");

const currentTempIcon = document.getElementById("currentTempIcon");

const humididty = document.getElementById("humididy");
const minTemp = document.getElementById("minTemp");
const maxTemp = document.getElementById("maxTemp");

//************ */

let storageEmpty = localStorage.length == 0 ? true : false;

if (storageEmpty) {
  newUser();
} else {
  returning();
}
//************ */
function newUser() {
  inputContainer.style.display = "inline-block";
  inputContainer.style.animationName = "fadein";
  //inputContainer.style.animationDuration = "10s";
  var cityCyle = setInterval(cyleNames, 2500);

  serachBtn.addEventListener("click", (fucnion) => {
    var input = userInputTextFeild.value + "";
    console.log(input + "in the aciton");
    if (userInputTextFeild.value == "") {
      alert("Enter a city");
    } else {
      //alert(userInputTextFeild.value + "");
      // ****************

      getCurretWeather(input);
    }
  });

  userInputTextFeild.addEventListener("focusin", (fucnion) => {
    userInputTextFeild.placeholder = "";

    clearInterval(cityCyle);
  });

  // userInputTextFeild.addEventListener("focusout", (fucnion) => {
  //   setInterval(cyleNames, 2500);
  // });
}

function cyleNames() {
  const citites = [
    "New York City, NY.",
    "Los Angeles, CA.",
    "Chicago, IL.",
    "Houston, TX.",
    "Phoenix, AZ.",
    "Philadelphia, PA.",
    "San Diego, CA.",
  ];

  userInputTextFeild.placeholder =
    citites[Math.floor(Math.random() * citites.length)];
}

function getCurretWeather(input) {
  console.log(input + "in the fucnoni");

  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      input +
      "&units=imperial&appid=2fefb7fcd6a37f2fb7c60079982b701d"
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error("Bad response");
      }
      //if (response.status == 404) throw Error(response.status);
    })
    .then((data) => {
      console.log(data);

      var name = data["name"];
      var currentTemp = data["main"]["temp"];
      var descr = data["weather"][0]["description"];
      var tempMin = data["main"]["temp_min"];
      var tempMax = data["main"]["temp_max"];
      var humid = data["main"]["humidity"];
      var iconId = data["weather"][0]["icon"];

      var img = document.createElement("img");

      img.src = "Images/" + iconId + ".png";
      img.id = "currentTempIcon";

      city.textContent = name;
      description.textContent = descr;
      currentTempature.innerHTML = Math.round(currentTemp) + "°";
      currentTempature.appendChild(img);
      minTemp.textContent = Math.round(tempMin) + "°";
      maxTemp.textContent = Math.round(tempMax) + "°";
      humididty.textContent = Math.round(humid) + "%";

      localStorage.setItem("Location 1", input + "");
      // *********
      inputContainer.style.animationName = "fadeout";
      inputContainer.style.display = "none";
      loadCard();
      // *****
    })
    .catch((error) => {
      alert("Invaild city name");
    });
}

function returning() {
  getCurretWeather(localStorage.getItem("Location 1"));
  loadCard();
}

function loadCard() {
  cardContainer.style.animationName = "fadein";
  cardContainer.style.display = "inline-block";
}
