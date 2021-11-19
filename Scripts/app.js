// // selcotrs
var serachBtn;
var inputContainer;
var userInputTextFeild;
var start;

const apiKey = "2fefb7fcd6a37f2fb7c60079982b701d";

window.onload = (load) => {
  if (apiKey) init();
  else alert("API key not FOUND. Please input app.js file");
};

function init() {
  serachBtn = document.getElementById("locBtn");
  inputContainer = document.getElementById("inputContainer");
  userInputTextFeild = document.querySelector(".userInput");
  start = document.getElementById("cardContainer");

  if (localStorage.length) {
  } else {
    inputContainer.style.display = "inline-block";
    inputContainer.style.animationName = "fadein";

    serachBtn.addEventListener("click", serachAction);
    document.addEventListener("click", addCardAction);
    document.addEventListener("click", delCardAction);
  }
}

// ***
function delCardAction(event) {
  if (event.target && event.target.classList == "delBtn") {
    if (localStorage.length == 1) {
      localStorage.clear();
      location.reload();
    } else {
      let itemDel = event.target.id;
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
  if (userInputTextFeild.value)
    getCurretWeather(
      userInputTextFeild.value,
      localData(userInputTextFeild.value)
    );
  else alert("Enter a city");
}

function addCardAction(event) {
  if (
    event.target.id == "addcard" ||
    event.target.classList == "fa fa-plus-circle fa-3x"
  ) {
    let newInput = prompt("Enter a city name");

    if (newInput) getCurretWeather(newInput, localData(newInput));
    else alert("Enter a city");
  }
}
// ***
async function getWeatherData(location) {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    location +
    "&units=imperial&appid=" +
    apiKey;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error: ${res.status}`);
  const data = await res.json();
  return data;
}

function getCurretWeather(input, index) {
  getWeatherData(input)
    .then((data) => {
      start = document.getElementById("cardContainer");

      if (index == "false") throw Error("max card limit");

      console.log(data);
      try {
        document.getElementById("addcard").remove();
      } catch (err) {
        console.log(err + "$$");
      }

      index = index + '"';
      start.insertAdjacentHTML(
        "beforeend",
        '  <div class="card" id ="' +
          index +
          '><div class="mainDay" id ="' +
          index +
          '> <button class ="delBtn" id =' +
          index +
          '> X </button> <h2 class="City"id ="' +
          index +
          '></h2> <h2 class="description"id ="' +
          index +
          '></h2> <h1 class="currentTemp"id ="' +
          index +
          '></h1><div class="moreData"id ="' +
          index +
          '><div><h1> Humidity</h1> <p class="humididy"id ="' +
          index +
          '></p></div><div> <h1> Preresure </h1><p class="Preresure"id ="' +
          index +
          '></p></div> <div> <h1> Wind </h1> <p class="Wind"id ="' +
          index +
          '></p> </div> </div></div> </div>  <div id ="addcard"> <i class="fa fa-plus-circle fa-3x" id ="addIcon" aria-hidden="true"></i> </div>'
      );

      //<i class="fa fa-plus-circle fa-3x" id = aria-hidden="true"></i>
      index = index.slice(0, -1);
      console.log(index + "");
      // *****
      let cardContainer = document.querySelector("#" + index + ".card");
      let city = document.querySelector("#" + index + ".City");
      let description = document.querySelector("#" + index + ".description");
      let currentTempature = document.querySelector(
        "#" + index + ".currentTemp"
      );

      let currentTempIcon = document.querySelector(
        "#" + index + ".currentTempIcon"
      );
      let humididty = document.querySelector("#" + index + ".humididy");
      // *****
      let airP = document.querySelector("#" + index + ".Preresure");
      let wind = document.querySelector("#" + index + ".Wind");
      // *****
      var name = data["name"];
      var currentTemp = data["main"]["temp"];
      var descr = data["weather"][0]["description"];
      // *****
      var currentAir = data["main"]["pressure"];
      var currentSpeed = data["wind"]["speed"];
      // *****
      var humid = data["main"]["humidity"];
      var iconId = data["weather"][0]["icon"];

      var img = document.createElement("img");

      img.src = "Images/" + iconId + ".png";
      img.className = "currentTempIcon";

      city.textContent = name;
      description.textContent = descr;
      currentTempature.innerHTML = Math.round(currentTemp) + "°";
      currentTempature.appendChild(img);
      // *****
      airP.textContent = Math.round(currentAir) + " hPa";
      wind.textContent = Math.round(currentSpeed) + " mph";
      // *****
      humididty.textContent = Math.round(humid) + "%";

      // *********
      inputContainer.style.animationName = "fadeout";
      inputContainer.style.display = "none";

      cardContainer.style.animationName = "fadein";
      cardContainer.style.display = "inline-block";

      if (localStorage.length == 3) {
        document.getElementById("addcard").style.display = "none";
      } else {
        document.getElementById("addcard").style.display = "inline-block";
      }

      loadCard();
    })
    .catch((e) => console.log("***" + e));

  // start = document.getElementById("cardContainer");

  // if (index == "false") throw Error("max card limit");

  // console.log(data);
  // try {
  //   document.getElementById("addcard").remove();
  // } catch (err) {
  //   console.log(err + "$$");
  // }

  // index = index + '"';
  // start.insertAdjacentHTML(
  //   "beforeend",
  //   '  <div class="card" id ="' +
  //     index +
  //     '><div class="mainDay" id ="' +
  //     index +
  //     '> <button class ="delBtn" id =' +
  //     index +
  //     '> X </button> <h2 class="City"id ="' +
  //     index +
  //     '></h2> <h2 class="description"id ="' +
  //     index +
  //     '></h2> <h1 class="currentTemp"id ="' +
  //     index +
  //     '></h1><div class="moreData"id ="' +
  //     index +
  //     '><div><h1> Humidity</h1> <p class="humididy"id ="' +
  //     index +
  //     '></p></div><div> <h1> Preresure </h1><p class="Preresure"id ="' +
  //     index +
  //     '></p></div> <div> <h1> Wind </h1> <p class="Wind"id ="' +
  //     index +
  //     '></p> </div> </div></div> </div>  <div id ="addcard"> <i class="fa fa-plus-circle fa-3x" id ="addIcon" aria-hidden="true"></i> </div>'
  // );

  // //<i class="fa fa-plus-circle fa-3x" id = aria-hidden="true"></i>
  // index = index.slice(0, -1);
  // console.log(index + "");
  // // *****
  // let cardContainer = document.querySelector("#" + index + ".card");
  // let city = document.querySelector("#" + index + ".City");
  // let description = document.querySelector("#" + index + ".description");
  // let currentTempature = document.querySelector("#" + index + ".currentTemp");

  // let currentTempIcon = document.querySelector(
  //   "#" + index + ".currentTempIcon"
  // );
  // let humididty = document.querySelector("#" + index + ".humididy");
  // // *****
  // let airP = document.querySelector("#" + index + ".Preresure");
  // let wind = document.querySelector("#" + index + ".Wind");
  // // *****
  // var name = data["name"];
  // var currentTemp = data["main"]["temp"];
  // var descr = data["weather"][0]["description"];
  // // *****
  // var currentAir = data["main"]["pressure"];
  // var currentSpeed = data["wind"]["speed"];
  // // *****
  // var humid = data["main"]["humidity"];
  // var iconId = data["weather"][0]["icon"];

  // var img = document.createElement("img");

  // img.src = "Images/" + iconId + ".png";
  // img.className = "currentTempIcon";

  // city.textContent = name;
  // description.textContent = descr;
  // currentTempature.innerHTML = Math.round(currentTemp) + "°";
  // currentTempature.appendChild(img);
  // // *****
  // airP.textContent = Math.round(currentAir) + " hPa";
  // wind.textContent = Math.round(currentSpeed) + " mph";
  // // *****
  // humididty.textContent = Math.round(humid) + "%";

  // // *********
  // inputContainer.style.animationName = "fadeout";
  // inputContainer.style.display = "none";

  // cardContainer.style.animationName = "fadein";
  // cardContainer.style.display = "inline-block";

  // if (localStorage.length == 3) {
  //   document.getElementById("addcard").style.display = "none";
  // } else {
  //   document.getElementById("addcard").style.display = "inline-block";
  // }

  // loadCard();

  // *******

  // fetch(
  //   "https://api.openweathermap.org/data/2.5/weather?q=" +
  //     input +
  //     "&units=imperial&appid=" +
  //     apiKey
  // )
  //   .then((response) => {
  //     if (response.ok) {
  //       return response.json();
  //     } else {
  //       throw Error("Invaild city name");
  //     }
  //     //if (response.status == 404) throw Error(response.status);
  //   })
  // .then((data) => {
  //   // let start = document.getElementById("cardContainer");
  //   console.log(data);
  //   let index = localData(input);

  //   if (!index) throw Error("max card limit");

  //   try {
  //     document.getElementById("addcard").remove();
  //   } catch (err) {
  //     console.log(err + "");
  //   }

  //   index = index + '"';
  //   start.insertAdjacentHTML(
  //     "beforeend",
  //     '  <div class="card" id ="' +
  //       index +
  //       '><div class="mainDay" id ="' +
  //       index +
  //       '> <button class ="delBtn" id =' +
  //       index +
  //       '> X </button> <h2 class="City"id ="' +
  //       index +
  //       '></h2> <h2 class="description"id ="' +
  //       index +
  //       '></h2> <h1 class="currentTemp"id ="' +
  //       index +
  //       '></h1><div class="moreData"id ="' +
  //       index +
  //       '><div><h1> Humidity</h1> <p class="humididy"id ="' +
  //       index +
  //       '></p></div><div> <h1> Preresure </h1><p class="Preresure"id ="' +
  //       index +
  //       '></p></div> <div> <h1> Wind </h1> <p class="Wind"id ="' +
  //       index +
  //       '></p> </div> </div></div> </div>  <div id ="addcard"> <i class="fa fa-plus-circle fa-3x" id ="addIcon" aria-hidden="true"></i> </div>'
  //   );

  //   //<i class="fa fa-plus-circle fa-3x" id = aria-hidden="true"></i>
  //   index = index.slice(0, -1);
  //   console.log(index + "");
  //   // *****
  //   let cardContainer = document.querySelector("#" + index + ".card");
  //   let city = document.querySelector("#" + index + ".City");
  //   let description = document.querySelector("#" + index + ".description");
  //   let currentTempature = document.querySelector(
  //     "#" + index + ".currentTemp"
  //   );

  //   let currentTempIcon = document.querySelector(
  //     "#" + index + ".currentTempIcon"
  //   );
  //   let humididty = document.querySelector("#" + index + ".humididy");
  //   // *****
  //   let airP = document.querySelector("#" + index + ".Preresure");
  //   let wind = document.querySelector("#" + index + ".Wind");
  //   // *****
  //   var name = data["name"];
  //   var currentTemp = data["main"]["temp"];
  //   var descr = data["weather"][0]["description"];
  //   // *****
  //   var currentAir = data["main"]["pressure"];
  //   var currentSpeed = data["wind"]["speed"];
  //   // *****
  //   var humid = data["main"]["humidity"];
  //   var iconId = data["weather"][0]["icon"];

  //   var img = document.createElement("img");

  //   img.src = "Images/" + iconId + ".png";
  //   img.className = "currentTempIcon";

  //   city.textContent = name;
  //   description.textContent = descr;
  //   currentTempature.innerHTML = Math.round(currentTemp) + "°";
  //   currentTempature.appendChild(img);
  //   // *****
  //   airP.textContent = Math.round(currentAir) + " hPa";
  //   wind.textContent = Math.round(currentSpeed) + " mph";
  //   // *****
  //   humididty.textContent = Math.round(humid) + "%";

  //   // *********
  //   inputContainer.style.animationName = "fadeout";
  //   inputContainer.style.display = "none";

  //   cardContainer.style.animationName = "fadein";
  //   cardContainer.style.display = "inline-block";

  //   if (localStorage.length == 3) {
  //     document.getElementById("addcard").style.display = "none";
  //   } else {
  //     document.getElementById("addcard").style.display = "inline-block";
  //   }

  //   loadCard();
  //   // *****
  // })
  // .catch((error) => {
  //   alert(error);
  // });
}

function loadWeather(input, index) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      input +
      "&units=imperial&appid=2fefb7fcd6a37f2fb7c60079982b701d"
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error("Invaild city name");
      }
      //if (response.status == 404) throw Error(response.status);
    })
    .then((data) => {
      let start = document.getElementById("cardContainer");

      // *******
      // let index = localData(input)
      if (index == "false") throw Error("max card limit");

      try {
        document.getElementById("addcard").remove();
      } catch (err) {
        console.log(err + "");
      }

      index = index + '"';
      start.insertAdjacentHTML(
        "beforeend",
        '  <div class="card" id ="' +
          index +
          '><div class="mainDay" id ="' +
          index +
          '> <button class ="delBtn" id =' +
          index +
          '> X </button> <h2 class="City"id ="' +
          index +
          '></h2> <h2 class="description"id ="' +
          index +
          '></h2> <h1 class="currentTemp"id ="' +
          index +
          '></h1><div class="moreData"id ="' +
          index +
          '><div><h1> Humidity</h1> <p class="humididy"id ="' +
          index +
          '></p></div><div> <h1> Preresure </h1><p class="Preresure"id ="' +
          index +
          '></p></div> <div> <h1> Wind </h1> <p class="Wind"id ="' +
          index +
          '></p> </div> </div></div> </div>  <div id ="addcard"> <i class="fa fa-plus-circle fa-3x" id ="addIcon" aria-hidden="true"></i> </div>'
      );

      index = index.slice(0, -1);
      console.log(index + "");
      // *****
      let cardContainer = document.querySelector("#" + index + ".card");
      let city = document.querySelector("#" + index + ".City");
      let description = document.querySelector("#" + index + ".description");
      let currentTempature = document.querySelector(
        "#" + index + ".currentTemp"
      );

      let currentTempIcon = document.querySelector(
        "#" + index + ".currentTempIcon"
      );
      let humididty = document.querySelector("#" + index + ".humididy");
      // *****
      let airP = document.querySelector("#" + index + ".Preresure");
      let wind = document.querySelector("#" + index + ".Wind");
      // *****
      var name = data["name"];
      var currentTemp = data["main"]["temp"];
      var descr = data["weather"][0]["description"];
      // *****
      var currentAir = data["main"]["pressure"];
      var currentSpeed = data["wind"]["speed"];
      // *****
      var humid = data["main"]["humidity"];
      var iconId = data["weather"][0]["icon"];

      var img = document.createElement("img");

      img.src = "Images/" + iconId + ".png";
      img.className = "currentTempIcon";

      city.textContent = name;
      description.textContent = descr;
      currentTempature.innerHTML = Math.round(currentTemp) + "°";
      currentTempature.appendChild(img);
      // *****
      airP.textContent = Math.round(currentAir) + " hPa";
      wind.textContent = Math.round(currentSpeed) + " mph";
      // *****
      humididty.textContent = Math.round(humid) + "%";

      // *********
      inputContainer.style.animationName = "fadeout";
      inputContainer.style.display = "none";

      if (localStorage.length == 3) {
        document.getElementById("addcard").style.display = "none";
      } else {
        document.getElementById("addcard").style.display = "inline-block";
      }

      cardContainer.style.animationName = "fadein";
      cardContainer.style.display = "inline-block";

      loadCard();
      // *****
    })
    .catch((error) => {
      alert(error);
    });
}

function localData(input) {
  if (localStorage.getItem("zero") == null) {
    localStorage.setItem("zero", input + "");
    return "zero";
  } else if (localStorage.getItem("one") == null) {
    localStorage.setItem("one", input + "");
    return "one";
  } else if (localStorage.getItem("two") == null) {
    localStorage.setItem("two", input + "");
    return "two";
  } else return false;
}

function returning() {
  if (localStorage.getItem("zero") != null) {
    loadWeather(localStorage.getItem("zero"), "zero");
  }
  if (localStorage.getItem("one") != null) {
    loadWeather(localStorage.getItem("one"), "one");
  }
  if (localStorage.getItem("two") != null) {
    loadWeather(localStorage.getItem("two"), "two");
  }

  document.addEventListener("click", function (event) {
    ///USE eveent.target.classList, instead of event.target.id
    if (
      event.target.id == "addcard" ||
      event.target.classList == "fa fa-plus-circle fa-3x"
    ) {
      let newInput = prompt("Enter a city name");
      if (newInput == "") {
        alert("Enter a city");
      } else {
        //alert(userInputTextFeild.value + "");
        // ****************

        getCurretWeather(newInput);
      }

      // ans = ans + "  " + event.target.id;

      //  alert(ans + "");

      //  document.getElementById(itemDel + "").remove();
    }
  });

  document.addEventListener("click", function (event) {
    ///USE eveent.target.classList, instead of event.target.id
    if (event.target && event.target.classList == "delBtn") {
      if (localStorage.length == 1) {
        localStorage.clear();
        location.reload();
      } else {
        let itemDel = event.target.id;
        itemDel = itemDel.slice(0, -1);

        // ******
        document.getElementById(itemDel + "").remove();
        localStorage.removeItem("" + itemDel);
        console.log(itemDel);
        if (localStorage.length == 3) {
          document.getElementById("addcard").style.display = "none";
        } else {
          document.getElementById("addcard").style.display = "inline-block";
        }

        //  localStorage.removeItem(index + "");
      }
    }
  });

  // getCurretWeather(input);
  // getCurretWeather(localStorage.getItem("zero"));
}

function loadCard() {}
