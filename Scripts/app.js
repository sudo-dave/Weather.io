// // selcotrs
const serachBtn = document.getElementById("locBtn");
const cardContainer = document.getElementById("cardContainer");
const inputContainer = document.getElementById("inputContainer");
//************ */
const data = [];
let storageEmpty = localStorage.length == 0 ? true : false;

if (storageEmpty) {
  newUser();
} else {
  console.log(getMem);
  returning();
}
//************ */
function newUser() {
  inputContainer.style.display = "inline-block";
  inputContainer.style.animationName = "fadein";
  //inputContainer.style.animationDuration = "10s";

  serachBtn.addEventListener("click", (fucnion) => {
    inputContainer.style.animationName = "fadeout";
    inputContainer.style.display = "none";
    cardContainer.style.display = "inline-block";
    cardContainer.style.animationName = "fadein";

    //Get vaule from inpuesr
  });
}

function returning() {
  //cardContainer.style.display = "inline-block";
}
