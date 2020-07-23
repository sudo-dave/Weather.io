// // selcotrs
const serachBtn = document.getElementById("locBtn");
const cardContainer = document.getElementById("cardContainer");
const inputContainer = document.getElementById("inputContainer");
const userInputTextFeild = document.querySelector(".userInput");

//************ */
const data = [];
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
  var cityCyle = setInterval(cyleNames, 3000);

  serachBtn.addEventListener("click", (fucnion) => {
    if (userInputTextFeild.value == "") {
      alert("Enter a city");
    } else {
      alert(userInputTextFeild.value + "");
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=2fefb7fcd6a37f2fb7c60079982b701d"
      )
        .then((response) => response.json())
        .then((data) => console.log(data));
    }

    // fetch("api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}")
    //Get vaule from inpuesr
  });

  // userInput.addEventListener("focus", (fucnion) => {
  //   userInput.placeholder = "";

  //   clearInterval(cityCyle);
  // });

  userInputTextFeild.addEventListener("focusin", (fucnion) => {
    userInputTextFeild.placeholder = "";

    clearInterval(cityCyle);
  });

  userInputTextFeild.addEventListener("focusout", (fucnion) => {
    setInterval(cyleNames, 2500);
  });
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
function returning() {
  cardContainer.style.display = "inline-block";
  cardContainer.style.animationName = "fadein";
}

function getData(input) {
  alert(document.querySelector(".userInput").value + "");
  localStorage.add;
}
