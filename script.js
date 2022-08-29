const demoDiv = document.querySelector(".demo");
const newHero = document.querySelector(".newHero");
const searchBtn = document.querySelector(".searchBtn");
const searchBox = document.querySelector(".searchBox");
let names = "";

const random = () => {
    return Math.ceil(Math.random() * 731);
};
const token = 7994022530670563;
const baseURL = "https://www.superheroapi.com/api.php";

const superHero = () => {
    let id = random();
  fetch(`${baseURL}/${token}/${id}`)
    .then((res) => res.json())
    .then((data) => {
      getStats(data);
    });
};

superHero();
newHero.onclick = () => {
  demoDiv.innerHTML = `<img class="load" src="./assets/loading.svg">`;
  superHero();
};

searchBox.addEventListener("keyup", (event) => {
  event.preventDefault();
  if (event.keyCode === 13) {
    searchBtn.click();
  }
});

searchBtn.onclick = () => {
  demoDiv.innerHTML =`<img class="load" src="./assets/loading.svg">`
  names = searchBox.value;
  searchSuperHero();
};

const searchSuperHero = () => {
  fetch(`${baseURL}/${token}/search/${names}`)
    .then((res) => res.json())
    .then((data) => {
      getStats(data.results[0]);
    });
};

const getStats = (data) => {
  const name = `<h1>${data.name}</h1>`;
  const image = `</br><img src="${data.image.url}">`;
  const stats = Object.keys(data.powerstats)
    .map((stat) => {
      return `<p>${stat}: ${data.powerstats[stat]}</p>`;
    })
    .join("");
  demoDiv.innerHTML = `${name}${image}${stats}`;
};
